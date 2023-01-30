import Block from 'core/block/Block';
import { store } from 'core/store';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { changeUserPasswordAction } from 'services/user';
import { EditPasswordPageProps } from './types';
import './editPassword.css';

class EditPasswordPage extends Block<EditPasswordPageProps> {
  static componentName: 'EditPasswordPage';

  constructor(props: EditPasswordPageProps) {
    super({
      ...props,
      onClick: () => this.handleChangePassword(),
      onBlur: (e: Event) => this.handleCheck(e),
    });
  }

  getValues() {
    return Object.values(this.refs).reduce((acc, component) => {
      const input = component.node!.querySelector('input') as HTMLInputElement;
      if (input) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return { ...acc };
    }, {} as { [key in string]: string });
  }

  checkPasswordsAreEqual(pass1: string, pass2: string) {
    const error = this.refs.errorRef;
    if (pass1 !== pass2) {
      error.setProps({ error: 'Пароли не совпадают' });
      return false;
    }
    return true;
  }

  checkIsEmpty(oldPassword: string, newPassword: string, newPassword2: string) {
    const error = this.refs.errorRef;
    if (oldPassword === '' || newPassword === '' || newPassword2 === '') {
      error.setProps({ error: 'Поле не может быть пустым' });
      return true;
    }
    return false;
  }

  handleChangePassword() {
    const { oldPassword, newPassword, newPassword2 } = this.getValues();
    if (this.checkIsEmpty(oldPassword, newPassword, newPassword2)) {
      return;
    }
    if (!this.checkPasswordsAreEqual(newPassword, newPassword2)) {
      return;
    }
    store.dispatch(changeUserPasswordAction, {
      oldPassword,
      newPassword,
    });
  }

  handleCheck(e: Event) {
    const target = e.target as HTMLInputElement;
    const error = this.refs.errorRef;
    if (target.value === '') {
      error.setProps({ error: 'Поле не может быть пустым' });
    } else {
      error.setProps({ error: '' });
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
                onBlur=onBlur
            }}}
            {{{ EditRow
                title="Новый пароль"
                type="password"
                ref="newPassword"
                name="newPassword"
                onBlur=onBlur
            }}}
            {{{ EditRow
                title="Новый пароль еще раз"
                type="password"
                ref="newPassword2"
                name="newPassword2"
                onBlur=onBlur
            }}}
          </div>
          {{{ ErrorComponent
              className="edit_uder_data_error"
              ref="errorRef"
              error="${errorReason}"
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

const mapStateToProps = (state: AppState) => ({
  error: state.user.error,
  errorReason: state.user.errorReason,
  laoding: state.user.loading,
});

const EnhancedEditPasswordPage = connectStore(mapStateToProps)(EditPasswordPage);

export default EnhancedEditPasswordPage;
