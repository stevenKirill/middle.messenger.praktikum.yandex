import Block from 'core/Block';

interface LoginFormProps {
  onSubmit: () => void;
  onClick: () => void;
}

class LoginForm extends Block {
  static componentName: 'LoginForm';

  constructor({ onSubmit, onClick }: LoginFormProps) {
    super({ events: { submit: onSubmit, click: onClick } });

    this.setProps({
      onSubmit: (e: unknown) => this.handleAuth(e),
      onClick: (e) => this.handleAuth(e),
    });

    console.log(this.props);
  }

  handleAuth(e) {
    e.preventDefault();
    console.log(e);
  }

  protected render(): string {
    return `
    <div>
      <div class="login_inputs">
        {{{ Input name="login" placeholder="Логин" type="text" }}}
        {{{ Input name="password" placeholder="Пароль" type="password" }}}
      </div>
      {{{ Button textBtn="Зарегестрироваться" onClick=handleAuth }}}
    </div>
    `;
  }
}

export default LoginForm;
