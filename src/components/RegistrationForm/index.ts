import Block from 'core/Block';

interface RegistrationFormProps {
  onSubmit?: () => void;
  onClick: () => void;
}

class RegistrationForm extends Block {
  static componentName: 'RegistrationForm';

  constructor({ onClick }: RegistrationFormProps) {
    super({ events: { click: onClick } });

    this.setProps({
      onClick: this.handleRegister.bind(this),
    });
  }

  handleRegister(e: Event) {
    e.preventDefault();
    console.log(this.refs);
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
        }}}
        {{{ Input
            name="login"
            placeholder="Логин"
            type="text"
            ref="loginInput"
        }}}
        {{{ Input
            name="first_name"
            placeholder="Имя"
            type="text"
            ref="nameInput"
        }}}
        {{{ Input
            name="second_name"
            placeholder="Фамилия"
            type="text"
            ref="surnameInput"
        }}}
        {{{ Input
            name="phone"
            placeholder="Телефон"
            type="text"
            ref="phoneInput"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль"
            type="password"
            ref="passwordInput"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль (еще раз)"
            type="password"
            ref="passwordAgainInput"
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
