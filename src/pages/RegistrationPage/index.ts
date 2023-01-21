import Block from 'core/block/Block';
import { CoreRouter } from 'core/router/types';
import withRouter from 'utils/HOCS/withRouter';
import { store } from 'core/store';
import './registration.css';

type RegistrationPageProps = {
  router: CoreRouter;
  onClick?: (e: Event) => void;
};

class RegistrationPage extends Block<RegistrationPageProps> {
  static componentName: 'RegistrationPage';

  constructor(props: RegistrationPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onClick: (e: Event) => this.handleGoToLogin(e),
    });
  }

  handleGoToLogin(e: Event) {
    e.preventDefault();
    this.props.router.go('/login');
  }

  protected render(): string {
    const { loading, error, errorReason } = store.getState().registration;
    return `
    <div class="root">
    {{#if ${error}}}
    {{{ ErrorComponent
      error=${errorReason}
      ref="incorrectEmail"
    }}}
    {{else}}
    <div></div>
    {{/if}}
    <div>
    {{#if ${loading}}}
      <div>loadind</div>
    {{else}}
    <main class="registration">
      <h1 class="registration_header">Регистрация</h1>
      {{{ RegistrationForm onSubmit=handleRegister }}}
      {{{ Link url="#" text="Войти" onClick=onClick }}}
    </main>
    {{/if}}
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(RegistrationPage);
