import Block from 'core/block/Block';
import { store } from 'core/store';
import { singIn } from 'services/login';
import { validateLogin } from 'utils/validation';
import { LoginFormProps } from './types';

class LoginForm extends Block<LoginFormProps> {
  static componentName = 'LoginForm';

  constructor() {
    super({
      onClick: (e: Event) => this.handleAuth(e),
      onBlur: () => this.handleBlur(),
      error: '',
    });
  }

  handleBlur() {
    const { loginInput, error } = this.refs;
    const input = loginInput.node?.querySelector('input') as HTMLInputElement;
    const validated = validateLogin(input.value);
    error.setProps({
      error: validated,
    });
  }

  handleAuth(e: Event) {
    e.preventDefault();
    const { loginInput, passwordInput } = this.refs;
    const input1 = loginInput.node?.querySelector('input') as HTMLInputElement;
    const input2 = passwordInput.node?.querySelector('input') as HTMLInputElement;
    const login = input1.value;
    const password = input2.value;
    if (login === '' || password === '') {
      return;
    }
    store.dispatch(singIn, {
      login,
      password,
    });
  }

  protected render(): string {
    return `
    <form id="login_form">
      <div class="login_inputs">
        {{{ Input
            name="login"
            placeholder="Логин"
            type="text"
            ref="loginInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error
            ref="error"
            className="error_center"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль"
            type="password"
            ref="passwordInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
      </div>
      {{{ Button type="submit" textBtn="Войти" onClick=onClick }}}
    </form>
    `;
  }
}

export default LoginForm;
