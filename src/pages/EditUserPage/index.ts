import Block from 'core/block/Block';
import { store } from 'core/store';
import { validateFactory } from 'utils/validation';
import { UserInfoResponse } from 'api/login/types';
import { changeUserAvatarAction, changeUserDataAction } from 'services/user';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { EditUserPageProps } from './types';

class EditUserPage extends Block<EditUserPageProps> {
  static componentName: 'EditUserPage';

  constructor(props: EditUserPageProps) {
    super({
      ...props,
      onDataChange: (e: Event) => this.handleEdit(e),
      onAvatarChange: () => this.handleChangeAvatar(),
      onOpen: () => this.handleOpenWindow(),
      onInput: (e: Event) => this.handleFileInputChange(e),
      onChange: (e: Event) => this.handleTextInputChange(e),
      file: null,
      error: {},
    });
  }

  private getValuesAndNames() {
    return Object.values(this.refs).reduce((acc, component) => {
      const input: Nullable<HTMLInputElement> = component.node!.querySelector('input');
      if (input) {
        return {
          ...acc,
          [input.name]: input.value,
        };
      }
      return { ...acc };
    }, {} as Record<string, string>);
  }

  checkValues(valuesAndNames: Record<string, string>) {
    return Object.entries(valuesAndNames).map(([name, value]) => {
      if (name === 'display_name') return '';
      const isValid = validateFactory(name, value);
      return isValid;
    }).every((val) => val === '');
  }

  handleEdit(e: Event) {
    e.preventDefault();
    const valuesAndNames = this.getValuesAndNames();
    const allValid = this.checkValues(valuesAndNames);
    if (allValid) {
      store.dispatch(changeUserDataAction, valuesAndNames);
    }
  }

  handleChangeAvatar() {
    const formData = new FormData();
    formData.append('avatar', this.props.file as Blob);
    store.dispatch(changeUserAvatarAction, formData);
  }

  handleOpenWindow() {
    const input = document.getElementById('logo') as HTMLInputElement;
    input.click();
  }

  handleFileInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    let file;
    if (target.files) {
      file = target.files[0];
      this.setProps({ ...this.props, file });
    }
  }

  handleTextInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const validated = validateFactory(target.name, target.value) as string;
    const current = this.refs[target.name];
    current.setProps({ error: validated });
  }

  protected render(): string {
    const {
      userData, changeDataError, changeDataErrorReason, avatar, loading,
    } = this.props;
    return `
    <div class="user">
      {{{ BackLink }}}
      {{#if ${loading}}}
      {{{ Loader }}}
    {{else}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_head">
            {{{ FileInput
                source="${avatar}"
                onOpen=onOpen
                onInput=onInput
            }}}
            <div class="edit_user_footer">
              {{{ Button
                  textBtn="Изменить аватар"
                  onClick=onAvatarChange
              }}}
            </div>
            {{#if ${changeDataError}}}
              {{{ ErrorComponent
                  className="edit_uder_data_error"
                  error="${changeDataErrorReason}"
              }}}
            {{else}}
              <div></div>
            {{/if}}
          </div>
          <div class="user_right_data_body">
            {{{ EditRow
                title="Почта"
                type="email"
                value="${userData.email || ''}"
                name="email"
                ref="emailInput"
                onChange=onChange
            }}}
            <div class="error_row">
              <div></div>
              {{{ ErrorComponent
                  className="max_error_length"
                  error=error.email
                  ref="email"
              }}}
            </div>
            {{{ EditRow
                title="Логин"
                type="text"
                value="${userData.login || ''}"
                name="login"
                ref="loginInput"
                onChange=onChange
            }}}
            <div class="error_row">
              <div></div>
              {{{ ErrorComponent
                  className="max_error_length"
                  error=error.login
                  ref="login"
              }}}
            </div>
            {{{ EditRow
                title="Имя"
                type="text"
                value="${userData.first_name || ''}"
                name="first_name"
                ref="firstNameInput"
                onChange=onChange
            }}}
            <div class="error_row">
              <div></div>
              {{{ ErrorComponent
                  className="max_error_length"
                  error=error.name
                  ref="first_name"
              }}}
            </div>
            <div>
            {{{ EditRow
                title="Фамилия"
                type="text"
                value="${userData.second_name || ''}"
                name="second_name"
                ref="secondNameInput"
                onChange=onChange
            }}}
            <div class="error_row">
              <div></div>
              {{{ ErrorComponent
                  className="max_error_length"
                  error=error.surName
                  ref="second_name"
              }}}
            </div>
            {{{ EditRow
                title="Имя в чате"
                type="text"
                value="${userData.display_name || ''}"
                name="display_name"
                ref="displayNameInput"
                onChange=onChange
            }}}
            <div class="error_row">
              <div></div>
              {{{ ErrorComponent
                  className="max_error_length"
                  error=error.login
                  ref="display_name"
              }}}
            </div>
            {{{ EditRow
                title="Телефон"
                type="text"
                value="${userData.phone || ''}"
                name="phone"
                ref="phoneInput"
                onChange=onChange
            }}}
            <div class="error_row">
              <div></div>
              {{{ ErrorComponent
                  className="max_error_length"
                  error=error.phone
                  ref="phone"
              }}}
            </div>
          </div>
          <div class="edit_user_footer">
            {{{ Button textBtn="Сохранить" onClick=onDataChange }}}
          </div>
        </div>
      </div>
    {{/if}}
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  avatar: state.user.data?.avatar as string,
  userData: state.user.data as UserInfoResponse,
  changeDataError: state.user.error,
  changeDataErrorReason: state.user.errorReason as string,
  loading: state.user.loading,
});

const EnhancedEditUserPage = connectStore(mapStateToProps)(EditUserPage);

export default EnhancedEditUserPage;
