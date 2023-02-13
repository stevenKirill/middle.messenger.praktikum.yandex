import Block from 'core/block/Block';
import { store } from 'core/store';
import appRouter from 'core/router';
import { logOutAction } from 'services/login';
import connectStore from 'utils/HOCS/connectStore';
import { AppState } from 'core/store/types';
import { UserPageProps } from './types';

class UserPage extends Block<UserPageProps> {
  static componentName: 'UserPage';

  constructor(props: UserPageProps) {
    super({
      ...props,
      editableAvatar: true,
      onEditDataPage: (e: Event) => this.handleGoToEditDataPage(e),
      onEditPasswordPage: (e: Event) => this.handleGoToEditPasswordPage(e),
      onChat: (e: Event) => this.handleGoToChat(e),
      onLogout: (e: Event) => this.handleLogout(e),
    });
  }

  handleGoToEditDataPage(e: Event) {
    e.preventDefault();
    appRouter.go('/edit/info');
  }

  handleGoToEditPasswordPage(e: Event) {
    e.preventDefault();
    appRouter.go('/edit/password');
  }

  handleGoToChat(e: Event) {
    e.preventDefault();
    appRouter.go('/chats');
  }

  handleLogout(e: Event) {
    e.preventDefault();
    store.dispatch(logOutAction);
  }

  protected render(): string {
    const {
      firstName, avatar, secondName, email, phone, displayName, login,
    } = this.props;
    return `
    <div class="user">
      {{{ BackLink }}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_head">
            {{#if ${Boolean(avatar)}}}
              {{{ Avatar source="${avatar}" width="150" height="150" }}}
            {{else}}
              {{{ EmptyAvatar width="150" height="150" }}}
            {{/if}}
            <p>${firstName}</p>
          </div>
          <div class="user_right_data_body">
            {{{ Row title="Имя" value="${firstName || 'Нет данных'}" }}}
            {{{ Row title="Фамилия" value="${secondName || 'Нет данных'}" }}}
            {{{ Row title="email" value="${email || 'Нет данных'}" }}}
            {{{ Row title="Логин" value="${login || 'Нет данных'}" }}}
            {{{ Row title="Телефон" value="${phone || 'Нет данных'}" }}}
            {{{ Row title="Имя в чате" value="${displayName || 'Нет данных'}" }}}
          </div>
          <div class="user_right_data_footer">
            <div class="user_right_data_footer_link">
              {{{ Link text="Изменить данные" onClick=onEditDataPage }}}
              {{{ Link text="Изменить пароль" onClick=onEditPasswordPage  }}}
              {{{ Link text="Чаты" onClick=onChat  }}}
              {{{ Link text="Выйти" onClick=onLogout  }}}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  firstName: state.user.data?.first_name,
  secondName: state.user.data?.second_name,
  email: state.user.data?.email,
  login: state.user.data?.login,
  phone: state.user.data?.phone,
  displayName: state.user.data?.display_name,
  avatar: state.user.data?.avatar,
});

// @ts-ignore
const EnhancedUserPage = connectStore(mapStateToProps)(UserPage);

export default EnhancedUserPage;
