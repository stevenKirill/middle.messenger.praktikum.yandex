import Block from 'core/Block';
import './editPassword.css';
import { TUserData } from './types';
import userTempData from './constants';

export interface EditPasswordPageProps {
  editableAvatar: boolean;
  userData: TUserData[];
}

class EditPasswordPage extends Block {
  static componentName: 'EditPasswordPage';

  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      userData: userTempData,
    });
  }

  protected render(): string {
    return `
    <div class="user">
      {{{ BackLink }}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_head">
            {{{ Avatar editableAvatar=editableAvatar }}}
          </div>
          <div class="user_right_data_body">
            {{#each userData}}
              {{{ EditRow
                  title=this.title
                  type=this.type
                  value=this.value
              }}}
            {{/each}}
          </div>
          <div class="edit_password_footer">
            {{{ Button textBtn="Сохранить" }}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default EditPasswordPage;
