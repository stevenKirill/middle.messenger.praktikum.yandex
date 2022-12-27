import Block from 'core/Block';

import './login.css';

export interface LoginPageProps {
  name: string;
}

class LoginPage extends Block {
  constructor() {
    super({ });
    this.setProps({
      onSubmit: (e: unknown) => this.handleAuth(e),
    });
  }

  handleAuth(e: unknown) {
    // e.preventDefault();
    // console.log(e);
  }

  protected render(): string {
    return `
    <div class="root">
      <main class="login">
        <div class="login_header">Вход</div>
        {{{ LoginForm onSubmit=handleAuth }}}
        {{{ Link url="#" text="Нет аккаунта" }}}
      </main>
    </div>
    `;
  }
}

export default LoginPage;
