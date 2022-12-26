import Block from '../../core/Block';

import './user.css';

interface UserPageProps {
}

// stylesheets:
// - ../../styles/styles.css
// avatar: "avatar"
// userName: kirill
// userData: [
//   { title: 'Почта', value: 'yandex' },
//   { title: 'Логин', value: 'kirill15' },
//   { title: 'Имя', value: 'Кирилл' },
//   { title: 'Фамилия', value: 'Павловский' },
//   { title: 'Имя в чате', value: 'kirill' },
//   { title: 'Телефон', value: '+7 999 111 11 11' },
// ]
// userLinks: [
//   { url: '../EditUser/EditUser.hbs', text: 'Изменить данные', isRed: false, },
//   { url: '../EditPassword/EditPassword.hbs', text: 'Изменить пароль', isRed: false, },
//   { url: '#', text: 'Выйти', isRed: true },
// ]

export class UserPage extends Block {
  constructor({}: UserPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< userContainer}}
    <div class="user_right">
      <div class="user_right_data">
        <div class="user_right_data_head">
          {{> "Avatar/Avatar"}}
          <p>{{userName}}</p>
        </div>
        <div class="user_right_data_body">
          {{#each userData}}
            {{> "Row/Row"}}
          {{/each}}
        </div>
        <div class="user_right_data_footer">
          {{#each userLinks}}
            <div class="user_right_data_footer_link">
              {{#if this.isRed}}
              <a
                class="user_right_data_footer_link_a color_red"
                  href={{this.url}}
                >
                {{this.text}}
              </a>
              {{else}}
              <a
                class="user_right_data_footer_link_a color_blue"
                  href={{this.url}}
                >
                {{this.text}}
              </a>
              {{/if}}
            </div>
          {{/each}}
        </div>
      </div>
    </div>
    `
  }
}