import Block from '../../core/Block';

interface RegistrationFormProps {
  onSubmit: () => void;
}

export class RegistrationForm extends Block {
  constructor({ onSubmit }: RegistrationFormProps) {
    super({ events: { submit: onSubmit } });
  }

  protected render(): string {
    return `
    <form>
      <div class="registration_inputs">
        {{{ Input name="email" placeholder="Почта" type="email" }}}
        {{{ Input name="login" placeholder="Логин" type="text" }}}
        {{{ Input name="first_name" placeholder="Имя" type="text" }}}
        {{{ Input name="second_name" placeholder="Фамилия" type="text" }}}
        {{{ Input name="phone" placeholder="Телефон" type="text" }}}
        {{{ Input name="password" placeholder="Пароль" type="password" }}}
        {{{ Input name="password" placeholder="Пароль (еще раз)" type="password" }}}
      </div>
      {{{ Button
          textBtn="Зарегестрироваться"
          onClick=handleRegister
      }}}
    </form>
    `
  }
}
