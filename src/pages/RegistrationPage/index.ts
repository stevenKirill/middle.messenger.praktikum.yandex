import Block from 'core/Block';

import './registration.css';

class RegistrationPage extends Block {
  protected render(): string {
    return `
    <div class="root">
      <main class="registration">
        <div class="registration_header">Регистрация</div>
        {{{ RegistrationForm onSubmit=handleRegister }}}
        {{{ Link url="#" text="Войти" }}}
      </main>
    </div>
    `;
  }
}

export default RegistrationPage;
