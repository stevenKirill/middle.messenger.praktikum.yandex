import Block from 'core/Block';

interface LoginFormProps {
  onSubmit: () => void;
}

class LoginForm extends Block {
  constructor({ onSubmit }: LoginFormProps) {
    super({ events: { submit: onSubmit } });
  }

  protected render(): string {
    return `
    <form>
      <div class="login_inputs">
        {{{ Input name="login" placeholder="Логин" type="text" }}}
        {{{ Input name="password" placeholder="Пароль" type="password" }}}
      </div>
      {{{ Button textBtn="Зарегестрироваться" }}}
    </form>
    `
  }
}

export default LoginForm;
