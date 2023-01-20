import Block from 'core/block/Block';
import withRouter from 'utils/HOCS/withRouter';
import './login.css';
import { CoreRouter } from 'core/router/types';

type LoginPageProps = {
  router: CoreRouter;
  onClick?: (e: Event) => void;
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

  handleGoToRegistration(e: Event) {
    e.preventDefault();
    this.props.router.go('/registration');
  }

  protected render(): string {
    return `
    <div class="root">
      <main class="login">
        <h1 class="login_header">Вход</h1>
        {{{ LoginForm }}}
        {{{ Link url="#" text="Нет аккаунта" onClick=onClick }}}
      </main>
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(LoginPage);
