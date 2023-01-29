import Block from 'core/block/Block';
import appRouter from 'core/router';
import connectStore from 'utils/HOCS/connectStore';
import { AppState } from 'core/store/types';
import { RegistrationPageProps } from './type';
import './registration.css';

class RegistrationPage extends Block<RegistrationPageProps> {
  static componentName: 'RegistrationPage';

  constructor(props: RegistrationPageProps) {
    super({
      ...props,
      onClick: (e: Event) => this.handleGoToLogin(e),
    });
  }

  handleGoToLogin(e: Event) {
    e.preventDefault();
    appRouter.go('/login');
  }

  protected render(): string {
    const { loading, error, errorReason } = this.props;
    return `
    <div class="root">
      {{#if ${error}}}
      {{{ ErrorComponent
          error="${errorReason}"
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
        {{{ RegistrationForm }}}
        {{{ Link text="Войти" onClick=onClick }}}
      </main>
      {{/if}}
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  error: state.registration.error,
  errorReason: state.registration.errorReason,
  loading: state.registration.loading,
});

const EnhancedRegistartion = connectStore(mapStateToProps)(RegistrationPage);
export default EnhancedRegistartion;
