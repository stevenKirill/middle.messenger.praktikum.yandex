import Block from '../../core/Block';

import './login.css';

interface LoginPageProps {
}

export class LoginPage extends Block {
  constructor({}: LoginPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< container}}
    <main class="login">
      <div class="login_header">Вход</div>
      <form>
        <div class="login_inputs">
          {{> "Input/Input" name="login" placeholder="Логин" type="text"}}
          {{> "Input/Input" name="password" placeholder="Пароль" type="password"}}
        </div>
        {{> "Button/Button"}}
      </form>
      {{> "Link/Link" url="" class="login_link" text="Нет аккаунта"}}
    </main>
    `
  }
}
