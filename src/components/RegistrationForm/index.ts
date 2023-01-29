import Block from 'core/block/Block';
import { validateFactory } from 'utils/validation';
import { store } from 'core/store';
import { signUp } from 'services/login';
import { Nullable } from 'core/types';
import { RegistrationProps } from './types';

class RegistrationForm extends Block<RegistrationProps> {
  static componentName = 'RegistrationForm';

  constructor() {
    super({
      onClick: (e: Event) => this.handleRegister(e),
      onChange: (e) => {
        const target = e.target as HTMLInputElement;
        const validated = validateFactory(target.name, target.value) as string;
        const current = this.refs[target.name];
        current.setProps({
          error: validated,
        });
      },
    });
  }

  handleRegister(e: Event) {
    e.preventDefault();
    const valuesAndNames = Object.entries(this.refs).reduce((acc, [_key, component]) => {
      const input: Nullable<HTMLInputElement> = component.node!.querySelector('input');
      if (input) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return { ...acc };
    }, {} as Record<string, string>);
    let prevPass: string;
    const allValid = Object.entries(valuesAndNames).map(([name, value]) => {
      if (name === 'password') {
        prevPass = value;
      }
      const extra = name === 'password2' ? { prevPass } : undefined;
      const isValid = validateFactory(name, value, extra);
      return isValid;
    }).every((val) => val === '');

    if (allValid) {
      store.dispatch(signUp, valuesAndNames);
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
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.email
            ref="email"
        }}}
        {{{ Input
            name="login"
            placeholder="Логин"
            type="text"
            ref="loginInput"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.login
            ref="login"
        }}}
        {{{ Input
            name="first_name"
            placeholder="Имя"
            type="text"
            ref="nameInput"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.name
            ref="first_name"
        }}}
        {{{ Input
            name="second_name"
            placeholder="Фамилия"
            type="text"
            ref="surnameInput"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.surName
            error=text
            ref="second_name"
        }}}
        {{{ Input
            name="phone"
            placeholder="Телефон"
            type="text"
            ref="phoneInput"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.phone
            error=text
            ref="phone"
        }}}
        {{{ Input
            name="password"
            placeholder="Пароль"
            type="password"
            ref="passwordInput"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.password
            error=text
            ref="password"
        }}}
        {{{ Input
            name="password2"
            placeholder="Пароль (еще раз)"
            type="password"
            ref="passwordAgainInput"
            onFocus=onFocus
            onBlur=onBlur
            onInput=onChange
        }}}
        {{{ ErrorComponent
            error=error.passwordAgain
            error=text
            ref="password2"
        }}}
      </div>
      <div class="registration_btn">
        {{{ Button
            type="submit"
            textBtn="Зарегестрироваться"
            onClick=onClick
        }}}
      </div>
    </form>
    </div>
    `;
  }
}

export default RegistrationForm;
