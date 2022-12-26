import Block from '../../core/Block';

import './editPassword.css';

interface EditPasswordPageProps {
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

export class EditPasswordPage extends Block {
  constructor({}: EditPasswordPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< userContainer}}
    <div class="user_right">
      <div class="user_right_data">
        <div class="user_right_data_head">
          {{> "Avatar/Avatar" editableAvatar=editableAvatar}}
        </div>
        <div class="user_right_data_body">
          {{#each userData}}
            {{> "EditRow/EditRow"}}
          {{/each}}
        </div>
        <div class="edit_password_footer">
          {{> "Button/Button"}}
        </div>
      </div>
    </div>
    `
  }
}