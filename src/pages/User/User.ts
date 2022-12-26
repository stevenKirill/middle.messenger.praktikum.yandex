import Block from '../../core/Block';
import { TUserData } from './types';

import './user.css';

// temp data
const data = [
  { title: 'Почта', value: 'yandex', },
  { title: 'Логин', value: 'kirill15', },
  { title: 'Имя', value: 'Кирилл',  },
  { title: 'Фамилия', value: 'Павловский', },
  { title: 'Имя в чате', value: 'kirill', },
  { title: 'Телефон', value: '+7 999 111 11 11', },
];

interface UserPageProps {
  userData: TUserData;
  userName: string;
}

export class UserPage extends Block {
  constructor() {
    super();
    this.setProps({
      editableAvatar: false,
      userData: data,
      userName: 'Кирилл',
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
            <p>{{userName}}</p>
          </div>
          <div class="user_right_data_body">
            {{#each userData}}
              {{{ Row title=this.title value=this.value }}}
            {{/each}}
          </div>
          <div class="user_right_data_footer">
            <div class="user_right_data_footer_link">
              {{{ Link url="#" text="Изменить данные" }}}
              {{{ Link url="#" text="Изменить пароль"  }}}
              {{{ Link url="#" text="Выйти" className="main_link_red"  }}}
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
}
