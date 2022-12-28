import Block from 'core/Block';
import { validateEmail, validateLogin } from 'utils/validation';

class RegistrationForm extends Block {
  static componentName: 'RegistrationForm';

  constructor() {
    super();
    this.setProps({
      onClick: this.handleRegister.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      // values: {
      //   email: 'e',
      //   login: 'a',
      //   first_name: '1',
      //   second_name: '2',
      //   phone: '4',
      //   password: '1',
      //   password2: '2',
      // },
      error: null,
    });
  }

  handleBlur() {
    // @ts-ignore
    if (this.props.error === null) {
      this.setProps({
        ...this.props,
        error: {
          email: 'roror',
          login: 'jaja',
          name: 'lol',
          surName: 'lala',
          phone: '1',
          password: '2',
          passwordAgain: '3',
        },
      });
    }
  }
  // Сообщения пропадают после ввода и на кнопку доп проверка

  handleChange(e: Event) {
    console.log(e);
    // const target = e.target as HTMLInputElement;
    // this.setProps({
    //   ...this.props,
    //   values: {
    //     ...this.props.values,
    //     [target.name]: target.value,
    //   },
    // });
  }

  handleFocus() {
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
    // this.setProps({
    //   ...this.props,
    //   error: {
    //     email: '',
    //     login: '',
    //     name: '',
    //     surName: '',
    //     phone: '',
    //     password: '',
    //     passwordAgain: '',
    //   },
    // });
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
            onInput=onChange
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
      {{{ Button
          textBtn="Зарегестрироваться"
          onClick=onClick
      }}}
    </form>
    `;
  }
}

export default RegistrationForm;
