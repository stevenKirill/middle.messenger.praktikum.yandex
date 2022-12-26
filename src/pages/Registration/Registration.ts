import Block from '../../core/Block';

import './registration.css';

interface RegistrationPageProps {
}

export class RegistrationPage extends Block {
  constructor({}: RegistrationPageProps) {
    super();
    this.setProps({
      onSubmit: (e: any) => this.handleRegister(e),
    })
  }

  handleRegister(e: any) {
    e.preventDefault();
    console.log(e);
  }

  protected render(): string {
    return `
    <div class="root">
      <main class="registration">
        <div class="registration_header">Регистрация</div>
        {{{ RegistrationForm onSubmit=handleRegister }}}
        {{{ Link url="" text="Войти" }}}
      </main>
    </div>
    `
  }
}
