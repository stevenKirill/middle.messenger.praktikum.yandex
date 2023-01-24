import Block from 'core/block/Block';
import { CoreRouter } from 'core/router/types';
import withRouter from 'utils/HOCS/withRouter';
import { store } from 'core/store';
import './user.css';
import { logOutAction } from 'services/login';

export interface UserPageProps {
  editableAvatar: boolean;
  router: CoreRouter;
  onEditDataPage?: (e: Event) => void;
  onEditPasswordPage?: (e: Event) => void;
  onLogout?: () => void;
}

class UserPage extends Block<UserPageProps> {
  static componentName: 'UserPage';

  constructor(props: UserPageProps) {
    super(props);
    this.setProps({
      ...this.props,
      editableAvatar: true,
      onEditDataPage: (e: Event) => this.handleGoToEditDataPage(e),
      onEditPasswordPage: (e: Event) => this.handleGoToEditPasswordPage(e),
      onLogout: () => this.handleLogout(),
    });
  }

  handleGoToEditDataPage(e: Event) {
    e.preventDefault();
    this.props.router.go('/edit/info');
  }

  handleGoToEditPasswordPage(e: Event) {
    e.preventDefault();
    this.props.router.go('/edit/password');
  }

  handleLogout() {
    store.dispatch(logOutAction);
  }

  protected render(): string {
    const userData = store.getState().user.data;
    return `
    <div class="user">
      {{{ BackLink }}}
      <div class="user_right">
        <div class="user_right_data">
          <div class="user_right_data_head">
            {{{ Avatar
                editableAvatar=editableAvatar
                source="${userData?.avatar}"
            }}}
            <p>${userData?.first_name}</p>
          </div>
          <div class="user_right_data_body">
            {{{ Row title="Имя" value="${userData?.first_name || 'Нет данных'}" }}}
            {{{ Row title="Фамилия" value="${userData?.second_name || 'Нет данных'}" }}}
            {{{ Row title="email" value="${userData?.email || 'Нет данных'}" }}}
            {{{ Row title="Логин" value="${userData?.login || 'Нет данных'}" }}}
            {{{ Row title="Телефон" value="${userData?.phone || 'Нет данных'}" }}}
            {{{ Row title="display_name" value="${userData?.display_name || 'Нет данных'}" }}}
          </div>
          <div class="user_right_data_footer">
            <div class="user_right_data_footer_link">
              {{{ Link url="#" text="Изменить данные" onClick=onEditDataPage }}}
              {{{ Link url="#" text="Изменить пароль" onClick=onEditPasswordPage  }}}
              {{{ Link url="#" text="Выйти" onClick=onLogout  }}}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(UserPage);
