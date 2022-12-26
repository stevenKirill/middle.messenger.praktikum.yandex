import Block from '../../core/Block';

import './registration.css';

interface RegistrationPageProps {
}

export class RegistrationPage extends Block {
  constructor({}: RegistrationPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< container}}
    <main class="registration">
      <div class="registration_header">Регистрация</div>
      <form>
        <div class="registration_inputs">
          {{> "Input/Input" name="email" placeholder="Почта" type="email"}}
          {{> "Input/Input" name="login" placeholder="Логин" type="text"}}
          {{> "Input/Input" name="first_name" placeholder="Имя" type="text"}}
          {{> "Input/Input" name="second_name" placeholder="Фамилия" type="text"}}
          {{> "Input/Input" name="phone" placeholder="Телефон" type="text"}}
          {{> "Input/Input" name="password" placeholder="Пароль" type="password"}}
          {{> "Input/Input" name="password" placeholder="Пароль (еще раз)" type="password"}}
        </div>
        {{> "Button/Button"}}
      </form>
      {{> "Link/Link" url=""  class="registration_link" text="Войти"}}
    </main>
    `
  }
}
