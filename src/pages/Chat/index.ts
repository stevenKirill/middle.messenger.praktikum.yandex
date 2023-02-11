import Block from 'core/block/Block';
import { store } from 'core/store';
import { getChatUsersAction, getChatsAction, selectChat } from 'services/chat/actions';
import appRouter from 'core/router';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { selectChats, selectCurrentChat } from 'services/chat/selectors';
import closeAllSockets from 'services/chat/closeAll';
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
        renderChats: () => {
          const chats = selectChats();
          const currentChat = selectCurrentChat();
          return (
            chats && chats.map((chat) => ({
              id: chat.id,
              title: chat.title,
              avatar: chat.avatar,
              last_message: chat.last_message,
              unread_count: chat.unread_count,
              activeClassName: () => (currentChat === chat.id ? 'active_chat' : ''),
              onClick: () => {
                store.dispatch({ messages: {} });
                closeAllSockets();
                store.dispatch(selectChat, chat.id);
                store.dispatch(getChatUsersAction, { chatId: chat.id });
              },
            }))
          );
        },
      },
    );
  }

  componentDidMount(): void {
    store.dispatch(getChatsAction);
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    appRouter.go('/profile');
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
          <div class="chat_page_left_chats">
          {{#if renderChats }}
          {{#each renderChats }}
            {{{ ChatItem
                id=this.id
                title=this.title
                avatar=this.avatar
                last_message=this.last_message
                unread_count=tis.unread_count
                onClick=onClick
                activeClassName=this.activeClassName
            }}}
          {{/each}}
          {{/if}}
          </div>
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
  chats: state.chats.data,
  loading: state.chats.loading,
  error: state.chats.error,
  errorReason: state.chats.errorReason,
  currentChat: state.chats.currentChat,
});

const EnhancedChatPage = connectStore(mapStateToProps)(ChatPage);

export default EnhancedChatPage;
