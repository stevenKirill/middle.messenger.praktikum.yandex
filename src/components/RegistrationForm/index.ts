import Block from 'core/Block';
import {
  validateEmail,
  validateLogin,
  validatePassword,
  validatePhone,
  validateFirstName,
  validatePassword2,
} from 'utils/validation';
import { RegistrationProps } from './types';

class RegistrationForm extends Block<RegistrationProps> {
  static componentName: 'RegistrationForm';

  constructor() {
    super();
    this.setProps({
      onClick: this.handleRegister.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      error: null,
    });
  }

  handleBlur() {
    if (this.props.error === null) {
      this.setProps({
        ...this.props,
        error: {
          email: validateEmail(''),
          login: validateLogin(''),
          name: validateFirstName(''),
          surName: validateFirstName(''),
          phone: validatePhone(''),
          password: validatePassword(''),
          passwordAgain: validatePassword2('', ''),
        },
      });
    }
  }
  // Сообщения пропадают после ввода и на кнопку доп проверка

  handleChange(e: Event) {
    console.log(e);
  }

  handleFocus() {
    // TODO подумать что сделать на фокус
    console.log('focus');
  }

  handleRegister(e: Event) {
    e.preventDefault();
    const inputValues = Object.values(this.refs).reduce((
      acc: { [key: string]: string },
      curr: HTMLElement,
    ) => {
      const input = curr.querySelector('input') as HTMLInputElement;
      if (!input) {
        return { ...acc };
      }
      return {
        ...acc,
        [input.name]: input.value,
      };
    }, {});
    console.log(inputValues);
    const validatedEmail = validateEmail(inputValues.email);
    const validatedLogin = validateLogin(inputValues.login);
    const validatedName = validateFirstName(inputValues.first_name);
    const validatedSurName = validateFirstName(inputValues.second_name);
    const validatedPhone = validatePhone(inputValues.phone);
    const validatedPassword = validatePassword(inputValues.password);
    const validatedPassword2 = validatePassword2(inputValues.password2, inputValues.password);
    this.setProps({
      ...this.props,
      error: {
        email: validatedEmail,
        login: validatedLogin,
        name: validatedName,
        surName: validatedSurName,
        phone: validatedPhone,
        password: validatedPassword,
        passwordAgain: validatedPassword2,
      },
    });
    const allValid: boolean = [
      validatedEmail,
      validatedLogin,
      validatedName,
      validatedSurName,
      validatedPhone,
      validatedPassword,
      validatedPassword2,
    ].every((val: string) => {
      console.log(val);
      return val !== '';
    });
    if (allValid) {
      console.log('логика по переходу в приложение');
    }
  }

  protected render(): string {
    return `
    <form>
      <div class="registration_inputs">
        {{{ Input
            name="email"
            placeholder="Почта"
            type="email"
            ref="emailInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.email
            ref="incorrectEmail"
        }}}
        {{{ Input
            name="login"
            placeholder="Логин"
            type="text"
            ref="loginInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.login
            ref="incorrectLogin"
        }}}
        {{{ Input
            name="first_name"
            placeholder="Имя"
            type="text"
            ref="nameInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.name
            ref="incorrectName"
        }}}
        {{{ Input
            name="second_name"
            placeholder="Фамилия"
            type="text"
            ref="surnameInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.surName
            error=text
            ref="incorrectsurName"
        }}}
        {{{ Input
            name="phone"
            placeholder="Телефон"
            type="text"
            ref="phoneInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.phone
            error=text
            ref="incorrectPhone"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль"
            type="password"
            ref="passwordInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.password
            error=text
            ref="incorrectPassword"
        }}}
        {{{ Input
            name="password2"
            placeholder="Пароль (еще раз)"
            type="password"
            ref="passwordAgainInput"
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{ ErrorComponent
            error=error.passwordAgain
            error=text
            ref="incorrectPasswordAgain"
        }}}
      </div>
      <div class="registration_btn">
        {{{ Button
            textBtn="Зарегестрироваться"
            onClick=onClick
        }}}
      </div>
    </form>
    `;
  }
}

export default RegistrationForm;
