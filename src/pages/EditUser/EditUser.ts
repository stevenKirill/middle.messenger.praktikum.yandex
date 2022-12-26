import Block from '../../core/Block';

import './editUser.css';
import { TUserData } from './types';

// temp data
const data = [
  { title: 'Почта', value: 'yandex', type: 'text', name: 'email', },
  { title: 'Логин', value: 'kirill15', type: 'text', name: 'login', },
  { title: 'Имя', value: 'Кирилл', type: 'text', name: 'first_name', },
  { title: 'Фамилия', value: 'Павловский', type: 'text', name: 'second_name', },
  { title: 'Имя в чате', value: 'kirill', type: 'text', name: 'display_name', },
  { title: 'Телефон', value: '+7 999 111 11 11', type: 'text', name: 'phone', },
];

// Как тут использовать интерфейс
interface EditUserPageProps {
  userData: TUserData[];
  editableAvatar: boolean;
}

export class EditUserPage extends Block {
  // запрашивать данные для редактирования с бэка
  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      userData: data,
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
                  name=this.name
              }}}
            {{/each}}
          </div>
          <div class="edit_user_footer">
            {{{ Button textBtn="Сохранить" }}}
          </div>
        </div>
      </div>
    </div>
    `
  }
}
