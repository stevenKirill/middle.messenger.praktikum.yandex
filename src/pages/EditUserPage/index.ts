import Block from 'core/block/Block';
import { store } from 'core/store';
import './editUser.css';
import { validateFactory } from 'utils/validation';

export interface EditUserPageProps {
  editableAvatar?: boolean;
  onClick?: () => void;
  onBlur?: (e: Event) => void;
}

class EditUserPage extends Block<EditUserPageProps> {
  static componentName: 'EditUserPage';

  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      onClick: () => this.handleEdit(),
      onBlur: (e: Event) => this.handleBlur(e),
    });
  }

  handleBlur(e: Event) {
    const target = e.target as HTMLInputElement;
  }

  handleEdit() {
    const inputuserData = Object.values(this.refs).reduce((acc, val) => {
      const input = val.querySelector('input') as HTMLInputElement;
      if (input) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return {
        acc,
        [input.name]: '',
      };
    }, {});
    console.log(inputuserData);
  }

  protected render(): string {
    const userData = store.getState().user.data;
    return `
    <div class="user">
      {{{ BackLink }}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_head">
            {{{ Avatar editableAvatar=editableAvatar }}}
          </div>
          <div class="user_right_data_body">
            {{{ EditRow
                title="Почта"
                type="email"
                value="${userData?.email || ''}"
                name="email"
                ref="email"
                onBlur=onBlur
            }}}
            {{{ ErrorComponent
                className="error_center"
                error=error.email
                ref="incorrectEmail"
            }}}
            {{{ EditRow
                title="Логин"
                type="text"
                value="${userData?.login || ''}"
                name="login"
                ref="login"
                onBlur=onBlur
            }}}
            {{{ EditRow
                title="Имя"
                type="text"
                value="${userData?.first_name || ''}"
                name="first_name"
                ref="first_name"
                onBlur=onBlur
            }}}
            {{{ EditRow
                title="Фамилия"
                type="text"
                value="${userData?.second_name || ''}"
                name="second_name"
                ref="second_name"
                onBlur=onBlur
            }}}
            {{{ EditRow
                title="Имя в чате"
                type="text"
                value="${userData?.display_name || ''}"
                name="display_name"
                ref="display_name"
                onBlur=onBlur
            }}}
            {{{ EditRow
                title="Телефон"
                type="text"
                value="${userData?.phone || ''}"
                name="phone"
                ref="phone"
                onBlur=onBlur
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
