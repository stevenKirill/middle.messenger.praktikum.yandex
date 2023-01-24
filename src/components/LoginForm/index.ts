import Block from 'core/block/Block';
import { store } from 'core/store';
import { singIn } from 'services/login';
import { LoginFormProps } from './types';

class LoginForm extends Block<LoginFormProps> {
  static componentName = 'LoginForm';

  constructor() {
    super();

    this.setProps({
      onClick: (e: Event) => this.handleAuth(e),
      onBlur: this.handleBlur.bind(this),
      error: '',
    });
  }

  handleBlur() {
    const error = this.props.error as string;
    const { loginInput, passwordInput } = this.refs;
    const inputLoginElement = loginInput.children[0] as HTMLInputElement;
    const inputPasswordElement = passwordInput.children[0] as HTMLInputElement;
    if (error === ''
      && inputLoginElement.value === ''
      && inputPasswordElement.value === ''
    ) {
      this.setProps({
        ...this.props,
        error: 'Введите логин и пароль',
      });
    }
  }

  handleAuth(e: Event) {
    e.preventDefault();
    const { loginInput, passwordInput } = this.refs;
    const inputLoginElement = loginInput.children[0] as HTMLInputElement;
    const inputPasswordElement = passwordInput.children[0] as HTMLInputElement;
    if (this.props.error !== '') {
      this.setProps({
        ...this.props,
        error: '',
      });
    }
    if (this.props.error === ''
    && (inputLoginElement.value === ''
    || inputPasswordElement.value === '')
    ) {
      this.setProps({
        ...this.props,
        error: 'Введите логин и пароль',
      });
    }
    if (inputLoginElement.value && inputPasswordElement.value) {
      store.dispatch(singIn, {
        login: inputLoginElement.value,
        password: inputPasswordElement.value,
      });
    }
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
      {{{ ErrorComponent
          error=error
          ref="error"
          className="error_center"
      }}}
    </form>
    `;
  }
}

export default LoginForm;
