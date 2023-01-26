import Block from 'core/block/Block';
import withRouter from 'utils/HOCS/withRouter';
import { CoreRouter } from 'core/router/types';
import { store } from 'core/store';
import './login.css';

type LoginPageProps = {
  router: CoreRouter;
  onClick?: (e: Event) => void;
  error: boolean;
  errorReason: string;
};

class LoginPage extends Block<LoginPageProps> {
  static componentName: 'LoginPage';

  constructor(props: LoginPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onClick: (e: Event) => this.handleGoToRegistration(e),
    });
  }

  componentDidMount(): void {
    this.setProps({
      ...this.props,
      error: store.getState().login.error,
      errorReason: store.getState().login.errorReason as string,
    });
    store.on('changed', () => this.onChangeStoreCallback());
  }

  onChangeStoreCallback() {
    this.setProps({
      ...this.props,
      error: store.getState().login.error,
      errorReason: store.getState().login.errorReason as string,
    });
  }

  handleGoToRegistration(e: Event) {
    e.preventDefault();
    this.props.router.go('/registration');
  }

  protected render(): string {
    const { error, errorReason } = this.props;
    return `
    <div class="root">
      <div>
        <main class="login">
          <h1 class="login_header">Вход</h1>
          {{{ LoginForm }}}
          {{{ Link url="#" text="Нет аккаунта" onClick=onClick }}}
        </main>
        {{#if ${error}}}
        {{{ ErrorComponent
            error="${errorReason}"
            className="edit_uder_data_error"
        }}}
        {{else}}
        <div></div>
        {{/if}}
      </div>
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(LoginPage);
