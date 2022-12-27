import Block from 'core/Block';

interface LoginFormProps {
  onSubmit?: () => void;
  onClick: () => void;
}

class LoginForm extends Block {
  static componentName: 'LoginForm';

  constructor({ onClick }: LoginFormProps) {
    super({ events: { click: onClick } });

    this.setProps({
      onClick: (e: Event) => this.handleAuth(e),
    });
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
  }

  // TODO переделать на тег формы и событие submit
  protected render(): string {
    return `
    <form id="login_form">
      <div class="login_inputs">
        {{{ Input
            name="login"
            placeholder="Логин"
            type="text"
            ref="loginInput"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль"
            type="password"
            ref="passwordInput"
        }}}
      </div>
      {{{ Button type="submit" textBtn="Зарегестрироваться" onClick=onClick }}}
    </form>
    `;
  }
}

export default LoginForm;
