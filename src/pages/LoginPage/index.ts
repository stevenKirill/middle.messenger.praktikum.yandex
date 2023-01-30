import Block from 'core/block/Block';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import appRouter from 'core/router';
import { LoginPageProps } from './types';
import './login.css';

class LoginPage extends Block<LoginPageProps> {
  static componentName: 'LoginPage';

  constructor(props: LoginPageProps) {
    super({
      ...props,
      onClick: (e: Event) => this.handleGoToRegistration(e),
    });
  }

  handleGoToRegistration(e: Event) {
    e.preventDefault();
    appRouter.go('/registration');
  }

  protected render(): string {
    const { error, errorReason, loading } = this.props;
    return `
    <div class="root">
    <div>
      <main class="login">
        <h1 class="login_header">Вход</h1>
        {{#if ${loading}}}
        <div class="center_loader">
        {{{ Loader }}}
        </div>
        {{else}}
        {{{ LoginForm }}}
        {{/if}}
        {{{ Link text="Нет аккаунта" onClick=onClick }}}
      </main>
      {{#if ${error}}}
      {{{ ErrorComponent
          error="${errorReason}"
          className="align_center"
      }}}
      {{else}}
      <div></div>
      {{/if}}
    </div>
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  error: state.login.error,
  errorReason: state.login.errorReason,
  loading: state.login.loading,
});

const withStore = connectStore(mapStateToProps);

const EnhancedLoginPage = withStore(LoginPage);
export default EnhancedLoginPage;
