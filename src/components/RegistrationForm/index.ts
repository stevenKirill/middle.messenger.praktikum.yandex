import Block from 'core/Block';

class RegistrationForm extends Block {
  static componentName: 'RegistrationForm';

  constructor() {
    super();

    this.setProps({
      onClick: this.handleRegister.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
    });
  }

  handleBlur() {
    console.log(this.refs);
    this.setProps({
      ...this.props,
      error: 'hello',
    });
    console.log(this.props);
    // this.refs.incorrectEmail.setProps({
    //   error: 'hello',
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
      const el = curr.children[0] as HTMLInputElement;
      return {
        ...acc,
        [el.name]: el.value,
      };
    }, {});
    console.log(inputValues);
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
            error=text
            ref="incorrectEmail"
        }}}
        {{{ Input
            name="login"
            placeholder="Логин"
            type="text"
            ref="loginInput"
            onFocus=onFocus
        }}}
        {{{ ErrorComponent
            error=text
            ref="incorrectLogin"
        }}}
        {{{ Input
            name="first_name"
            placeholder="Имя"
            type="text"
            ref="nameInput"
            onFocus=onFocus
        }}}
        {{{ ErrorComponent
            error=text
            ref="incorrectName"
        }}}
        {{{ Input
            name="second_name"
            placeholder="Фамилия"
            type="text"
            ref="surnameInput"
            onFocus=onFocus
        }}}
        {{{ ErrorComponent
            error=text
            ref="incorrectsurName"
        }}}
        {{{ Input
            name="phone"
            placeholder="Телефон"
            type="text"
            ref="phoneInput"
            onFocus=onFocus
        }}}
        {{{ ErrorComponent
            error=text
            ref="incorrectPhone"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль"
            type="password"
            ref="passwordInput"
            onFocus=onFocus
        }}}
        {{{ ErrorComponent
            error=text
            ref="incorrectPassword"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль (еще раз)"
            type="password"
            ref="passwordAgainInput"
            onFocus=onFocus
        }}}
        {{{ ErrorComponent
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
