import Block from 'core/block/Block';
import { store } from 'core/store';
import { singIn } from 'services/login';
import { validateLogin } from 'utils/validation';
import { LoginFormProps } from './types';

export class LoginForm extends Block<LoginFormProps> {
  static componentName = 'LoginForm';

  constructor() {
    super({
      onClick: (e: Event) => this.handleAuth(e),
      onBlur: (e: Event) => this.handleBlur(e),
      error: '',
    });
  }

  handleBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.name === 'login') {
      this.validateLogin(target);
    }
    if (target.name === 'password') {
      this.validatePassword(target);
    }
  }

  validateLogin(target: HTMLInputElement) {
    const { error } = this.refs;
    const validated = validateLogin(target.value);
    error.setProps({ error: validated });
  }

  validatePassword(target: HTMLInputElement) {
    const { error2 } = this.refs;
    if (target.value === '') {
      error2.setProps({ error: 'Пароль не может быть пустым' });
    } else {
      error2.setProps({ error: '' });
    }
  }

  private getInputsValues() {
    const { loginInput, passwordInput } = this.refs;
    const input1 = loginInput.node?.querySelector('input') as HTMLInputElement;
    const input2 = passwordInput.node?.querySelector('input') as HTMLInputElement;
    return {
      login: input1.value,
      password: input2.value,
    };
  }

  handleAuth(e: Event) {
    e.preventDefault();
    const { login, password } = this.getInputsValues();
    if (login === '' || password === '') {
      return;
    }
    store.dispatch(singIn, { login, password });
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
        {{{ ErrorComponent
            error=error
            ref="error2"
            className="error_center"
        }}}
      </div>
      {{{ Button type="submit" textBtn="Войти" onClick=onClick }}}
    </form>
    `;
  }
}
