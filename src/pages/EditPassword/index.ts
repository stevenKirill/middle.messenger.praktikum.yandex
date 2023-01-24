import Block from 'core/block/Block';
import './editPassword.css';
import { store } from 'core/store';
import { changeUserPasswordAction } from 'services/user';

export interface EditPasswordPageProps {
  error: string;
  onClick: () => void;
}

class EditPasswordPage extends Block<EditPasswordPageProps> {
  static componentName: 'EditPasswordPage';

  constructor() {
    super();
    this.setProps({
      error: '',
      onClick: () => this.handleChangePssword(),
    });
  }

  handleChangePssword() {
    const passwordValues = Object.values(this.refs).reduce((
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
    }, {} as { [key in string]: string });
    if (passwordValues.newPassword !== passwordValues.newPassword2) {
      this.setProps({
        ...this.props,
        error: 'Пароли не совпадают',
      });
    }
    if (passwordValues.newPassword === passwordValues.newPassword2) {
      store.dispatch(changeUserPasswordAction, {
        oldPassword: passwordValues.oldPassword,
        newPassword: passwordValues.newPassword,
      });
    }
  }

  protected render(): string {
    const { error, errorReason } = store.getState().user;
    return `
    <div class="user">
      {{{ BackLink }}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_body">
            {{{ EditRow
                title="Старый пароль"
                type="password"
                ref="oldPassword"
                name="oldPassword"
            }}}
            {{{ EditRow
                title="Новый пароль"
                type="password"
                ref="newPassword"
                name="newPassword"
            }}}
            {{{ EditRow
                title="Новый пароль еще раз"
                type="password"
                ref="newPassword2"
                name="newPassword2"
            }}}
          </div>
          {{{ ErrorComponent
              className="edit_uder_data_error"
              error=error
          }}}
          {{#if ${error}}}
          {{{ ErrorComponent
            className="edit_uder_data_error"
            error="${errorReason}"
          }}}
          {{else}}
          <div></div>
          {{/if}}
          <div class="edit_password_footer">
            {{{ Button textBtn="Сохранить" onClick=onClick }}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default EditPasswordPage;
