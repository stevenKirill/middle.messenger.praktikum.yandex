import Block from 'core/block/Block';

import './login.css';

class LoginPage extends Block {
  static componentName: 'LoginPage';

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
