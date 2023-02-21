import Block from 'core/block/Block';
import appRouter from 'core/router';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { getChatsAction, resetCurrentChat } from 'services/chat/actions';
import { store } from 'core/store';
import { ChatPageProps } from './types';

class ChatPage extends Block<ChatPageProps> {
  static componentName: 'ChatPage';

  constructor(props: ChatPageProps) {
    super(props);
    this.setProps(
      {
        ...props,
        onProfileGo: (e: Event) => this.handleGoToProfilePage(e),
        onChatCreate: () => this.handleCreateChat(),
      },
    );
  }

  componentDidMount(): void {
    store.dispatch(getChatsAction);
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    appRouter.go('/profile');
    store.dispatch(resetCurrentChat);
  }

  handleCreateChat() {
    const { createChatRef } = this.refs;
    createChatRef.setProps({ isShow: true });
  }

  protected render(): string {
    const { currentChat } = this.props;
    return `
    <div>
    <h2 class="chat_main_title">Чаты</h2>
      {{{ CreateChatModal
          isShow=isShow
          ref="createChatRef"
      }}}
      <main class="chat_page">
        <section class="chat_page_left">
          <div class="chat_page_left_create">
            {{{ Button textBtn="Создать чат" onClick=onChatCreate }}}
          </div>
          <div class="chat_page_left_profile">
            {{{ Link
                text="Профиль >"
                className="chat_page_left_profile_link"
                onClick=onProfileGo
            }}}
          </div>
          {{{ SearchInput }}}
          {{{ ChatBlock }}}
        </section>
        <section class="chat_page_right">
          {{#if currentChat }}
            {{{ ChatArea currentChatId="${currentChat}" }}}
          {{else}}
            {{{ EmptyChat }}}
          {{/if}}
        </section>
      </main>
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  currentChat: state.chats.currentChat,
});

const EnhancedChatPage = connectStore(mapStateToProps)(ChatPage);

export default EnhancedChatPage;
