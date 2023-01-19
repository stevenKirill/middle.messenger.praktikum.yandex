import Block from 'core/block/Block';

import './registration.css';

class RegistrationPage extends Block {
  static componentName: 'RegistrationPage';

  protected render(): string {
    return `
    <div class="root">
      <main class="registration">
        <h1 class="registration_header">Регистрация</h1>
        {{{ RegistrationForm onSubmit=handleRegister }}}
        {{{ Link url="#" text="Войти" }}}
      </main>
    </div>
    `;
  }
}

export default RegistrationPage;
