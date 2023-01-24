import Block from 'core/block/Block';
import { store } from 'core/store';
import './editUser.css';
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePhone,
} from 'utils/validation';
import { UserInfoResponse } from 'api/login/types';
import { UserDataKeys } from './types';

export interface EditUserPageProps {
  onClick?: () => void;
  error: {
    [key: string]: string
  }
}

class EditUserPage extends Block<EditUserPageProps> {
  static componentName: 'EditUserPage';

  constructor() {
    super();
    this.setProps({
      onClick: () => this.handleEdit(),
      error: {},
    });
  }

  handleEdit() {
    const inputUserData = Object.values(this.refs).reduce((
      acc,
      val: HTMLElement,
    ) => {
      const input = val.querySelector('input') as HTMLInputElement;
      if (input.value) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return {
        ...acc,
        [input.name]: '',
      };
    }, {} as { [key in UserDataKeys]: string });
    const validatedEmail = validateEmail(inputUserData.email);
    const validatedLogin = validateLogin(inputUserData.login);
    const validatedName = validateFirstName(inputUserData.first_name);
    const validatedSurName = validateFirstName(inputUserData.second_name);
    const validatedPhone = validatePhone(inputUserData.phone);
    store.dispatch({
      user: {
        ...store.getState().user,
        data: {
          ...store.getState().user.data as UserInfoResponse,
          ...inputUserData,
        },
      },
    });
    this.setProps({
      ...this.props,
      error: {
        email: validatedEmail,
        login: validatedLogin,
        name: validatedName,
        surName: validatedSurName,
        phone: validatedPhone,
      },
    });
    const allValid: boolean = [
      validatedEmail,
      validatedLogin,
      validatedName,
      validatedSurName,
      validatedPhone,
    ].every((val: string) => val === '');
    if (allValid) {
      console.log('send req to change data');
      console.log(inputUserData);
    }
  }

  protected render(): string {
    const userData = store.getState().user.data;
    return `
    <div class="user">
      {{{ BackLink }}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_head">
            {{{ Avatar
                editableAvatar=editableAvatar
                source="${userData?.avatar}"
            }}}
          </div>
          <div class="user_right_data_body">
            {{{ EditRow
                title="Почта"
                type="email"
                value="${userData?.email || ''}"
                name="email"
                ref="email"
            }}}
            {{{ ErrorComponent
                className="edit_uder_data_error"
                error=error.email
            }}}
            {{{ EditRow
                title="Логин"
                type="text"
                value="${userData?.login || ''}"
                name="login"
                ref="login"
            }}}
            {{{ ErrorComponent
                className="edit_uder_data_error"
                error=error.login
            }}}
            {{{ EditRow
                title="Имя"
                type="text"
                value="${userData?.first_name || ''}"
                name="first_name"
                ref="first_name"
            }}}
            {{{ ErrorComponent
                className="edit_uder_data_error"
                error=error.name
            }}}
            {{{ EditRow
                title="Фамилия"
                type="text"
                value="${userData?.second_name || ''}"
                name="second_name"
                ref="second_name"
            }}}
            {{{ ErrorComponent
                className="edit_uder_data_error"
                error=error.surName
            }}}
            {{{ EditRow
                title="Имя в чате"
                type="text"
                value="${userData?.display_name || ''}"
                name="display_name"
                ref="display_name"
            }}}
            {{{ ErrorComponent
                className="edit_uder_data_error"
                error=error.login
            }}}
            {{{ EditRow
                title="Телефон"
                type="text"
                value="${userData?.phone || ''}"
                name="phone"
                ref="phone"
            }}}
            {{{ ErrorComponent
                className="edit_uder_data_error"
                error=error.phone
            }}}
          </div>
          <div class="edit_user_footer">
            {{{ Button textBtn="Сохранить" onClick=onClick }}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default EditUserPage;
