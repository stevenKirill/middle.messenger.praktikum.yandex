import Block from '../../core/Block';

import './editUser.css';

interface EditUserPageProps {
}

export class EditUserPage extends Block {
  constructor({}: EditUserPageProps) {
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
        <div class="edit_user_footer">
          {{> "Button/Button"}}
        </div>
      </div>
    </div>
    `
  }
}
