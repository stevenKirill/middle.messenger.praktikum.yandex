import Block from 'core/Block';

import './editUser.css';
import { TUserData } from './types';
import userTestData from './constants';

export interface EditUserPageProps {
  userData?: TUserData[];
  editableAvatar?: boolean;
  onClick?: (e: Event) => void;
}

class EditUserPage extends Block<EditUserPageProps> {
  static componentName: 'EditUserPage';

  // запрашивать данные для редактирования с бэка
  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      userData: userTestData,
      onClick: (e: Event) => this.handleEdit(e),
    });
  }

  handleEdit(e: Event) {
    console.log(e);
    const inputValues = Object.values(this.refs).map((val) => {
      const input = val.querySelector('input') as HTMLInputElement;
      if (input) {
        return {
          [input.name]: input.value,
        };
      }
      return {
        noValue: '',
      };
    });
    console.log(inputValues);
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
                name=this.name
                ref=this.name
            }}}
          {{/each}}
          </div>
          {{{ ErrorComponent
              error="error"
              className="error_center"
              ref="incorrectEmail"
          }}}
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
