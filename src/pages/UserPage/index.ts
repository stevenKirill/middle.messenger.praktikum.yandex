import Block from 'core/block/Block';
import { CoreRouter } from 'core/router/types';
import withRouter from 'utils/HOCS/withRouter';
import { store } from 'core/store';
import './user.css';

export interface UserPageProps {
  userName: string;
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
    const userData = store.getState().user;
    this.setProps({
      ...this.props,
      userName: userData.data?.first_name as string,
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
    // TODO log out
    console.log('logout');
  }

  protected render(): string {
    const userData = store.getState().user.data;
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
            {{{ Row title="Имя" value="${userData?.first_name}" }}}
            {{{ Row title="Фамилия" value="${userData?.second_name}" }}}
            {{{ Row title="email" value="${userData?.email}" }}}
            {{{ Row title="Логин" value="${userData?.login}" }}}
            {{{ Row title="Телефон" value="${userData?.phone}" }}}
            {{{ Row title="display_name" value="${userData?.display_name}" }}}
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
