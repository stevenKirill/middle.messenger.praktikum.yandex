import Block from 'core/Block';

import './editUser.css';
import { TUserData } from './types';

// temp data
const data = [
  {
    title: 'Почта',
    value: 'yandex',
    type: 'text',
    name: 'email',
  },
  {
    title: 'Логин', value: 'kirill15', type: 'text', name: 'login',
  },
  {
    title: 'Имя', value: 'Кирилл', type: 'text', name: 'first_name',
  },
  {
    title: 'Фамилия', value: 'Павловский', type: 'text', name: 'second_name',
  },
  {
    title: 'Имя в чате', value: 'kirill', type: 'text', name: 'display_name',
  },
  {
    title: 'Телефон', value: '+7 999 111 11 11', type: 'text', name: 'phone',
  },
];

// Как тут использовать интерфейс
export interface EditUserPageProps {
  userData: TUserData[];
  editableAvatar: boolean;
  onClick: () => void;
}

class EditUserPage extends Block {
  // запрашивать данные для редактирования с бэка
  constructor() {
    super();
    this.setProps({
      editableAvatar: true,
      userData: data,
      events: { click: (e: Event) => this.handleEdit(e) },
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
    console.log(this.refs);
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
          <div class="edit_user_footer">
            {{{ Button textBtn="Сохранить" onClick=handleEdit }}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default EditUserPage;
