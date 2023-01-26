import Block from 'core/block/Block';
import withRouter from 'utils/HOCS/withRouter';
import { CoreRouter } from 'core/router/types';
import './chat.css';
import { store } from 'core/store';
import { getChatsAction } from 'services/chat';

type ChatPageProps = {
  router: CoreRouter;
  onProfileGo?: (e: Event) => void;
  onChatCreate?: () => void;
  isShow?: boolean;
};

class ChatPage extends Block<ChatPageProps> {
  static componentName: 'ChatPage';

  constructor(props: ChatPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onProfileGo: (e: Event) => this.handleGoToProfilePage(e),
      onChatCreate: () => this.handleCreateChat(),
    });
  }

  componentDidMount(): void {
    const init = async () => {
      await store.dispatch(getChatsAction);
      console.log(store.getState().chats.data, '=> nen')
    }
    init();
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    this.props.router.go('/profile');
  }

  handleCreateChat() {
    this.setProps({
      ...this.props,
      isShow: true,
    });
  }

  protected render(): string {
    return `
    <div>
      {{#if ${this.props.isShow}}}
        {{{ Modal isShow=isShow }}}
      {{else}}
      <div></div>
      {{/if}}
      <main class="chat_page">
        <section class="chat_page_left">
          <div class="chat_page_left_create">
            {{{ Button textBtn="Создать чат" onClick=onChatCreate }}}
          </div>
          <div class="chat_page_left_profile">
            {{{ Link
                url="#"
                text="Профиль >"
                className="chat_page_left_profile_link"
                onClick=onProfileGo
            }}}
          </div>
          {{{ SearchInput }}}
          <div class="chat_page_left_chats">
            {{{ ChatItem }}}
          </div>
        </section>
        <section class="chat_page_right">
          {{#if isEmpty}}
            {{{ EmptyChat }}}
            {{else}}
            {{{ ChatArea }}}
          {{/if}}
        </section>
      </main>
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(ChatPage);
