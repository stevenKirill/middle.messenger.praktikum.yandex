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
        <h1 class="login_header">Вход</h1>
        {{{ LoginForm }}}
        {{{ Link url="#" text="Нет аккаунта" }}}
      </main>
    </div>
    `;
  }
}

export default LoginPage;
