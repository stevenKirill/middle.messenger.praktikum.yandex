import Block from '../../core/Block';
import './editPassword.css';
import { TUserData } from './types';

const data = [
  { title: 'Старый пароль', value: '1', type: 'password' },
  { title: 'Новый пароль', value: '1', type: 'password' },
  { title: 'Повторить новый пароль', value: '1', type: 'password' },
];

interface EditPasswordPageProps {
  editableAvatar: boolean;
  userData: TUserData[];
}

// stylesheets:
// - ../../styles/styles.css
// avatar: "avatar"
// userData: [
//   { title: 'Старый пароль', value: '1', type: 'password' },
//   { title: 'Новый пароль', value: '1', type: 'password' },
//   { title: 'Повторить новый пароль', value: '1', type: 'password' },
// ]
// textBtn: Сохранить

class EditPasswordPage extends Block {
  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      userData: data,
    })
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
    `
  }
}

export default EditPasswordPage;
