import Block from '../../core/Block';

import './login.css';

interface LoginPageProps {
}

export class LoginPage extends Block {
  constructor({}: LoginPageProps) {
    super({ });
    this.setProps({
      onSubmit: (e: any) => this.handleAuth(e),
    })
  }

  handleAuth(e: any) {
    e.preventDefault();
    console.log(e);
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
    `
  }
}
