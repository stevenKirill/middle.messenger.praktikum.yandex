import Block from 'core/Block';

import './registration.css';

export interface RegistrationPageProps {
  name: string
}

class RegistrationPage extends Block {
  constructor() {
    super();
    this.setProps({
      onSubmit: (e: unknown) => this.handleRegister(e),
    });
  }

  handleRegister(e: unknown) {
    // e.preventDefault();
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
    `;
  }
}

export default RegistrationPage;
