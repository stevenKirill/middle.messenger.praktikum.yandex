import Block from 'core/Block';

import './login.css';

export interface LoginPageProps {
  name: string;
}

class LoginPage extends Block {
  protected render(): string {
    return `
    <div class="root">
      <main class="login">
        <div class="login_header">Вход</div>
        {{{ LoginForm }}}
        {{{ Link url="#" text="Нет аккаунта" }}}
      </main>
    </div>
    `;
  }
}

export default LoginPage;
