import Block from 'core/Block';
import { LoginFormProps } from './types';

class LoginForm extends Block<LoginFormProps> {
  static name = 'LoginForm';

  constructor() {
    super();

    this.setProps({
      onClick: (e: Event) => this.handleAuth(e),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      error: '',
    });
  }

  handleFocus(e: Event) {
    // TODO focus
    console.log(e, 'focus');
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
    console.log({
      login: inputLoginElement.value,
      password: inputPasswordElement.value,
    });
    if (this.props.error !== '') {
      this.setProps({
        ...this.props,
        error: '',
      });
    }
    if (this.props.error === ''
    && inputLoginElement.value === ''
    && inputPasswordElement.value === ''
    ) {
      this.setProps({
        ...this.props,
        error: 'Введите логин и пароль',
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
