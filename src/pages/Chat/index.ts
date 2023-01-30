import Block from 'core/block/Block';
import { store } from 'core/store';
import { createSocket, getChatsAction } from 'services/chat';
import { APIError } from 'api/types';
import chatApi from 'api/chat';
import appRouter from 'core/router';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { ChatPageProps } from './types';
import './chat.css';

// users: () => {
//   const { chats } = chatsModel.selectChats();
//   const { chatId } = router.getParams();

//   return (
//     chats &&
//     chats.map((chat) => {
//       return {
//         avatar: new Avatar({ className: "avatar_sm", img: getFile(chat.avatar) }),
//         name: chat.title,
//         message: chat.lastMessage && chat.lastMessage.content,
//         date: chat.lastMessage && formattedDate(new Date(chat.lastMessage.time)),
//         counter: chat.unreadCount,
//         className: () => (Number(chat.id) === Number(chatId) ? "active" : ""),
//         onClick: () => {
//           if (Number(chat.id) !== Number(chatId)) {
//             store.dispatch(chatsServices.selectChat, chat.id);
//           }
//         },
//       };
//     })
//   );
// },

class ChatPage extends Block<ChatPageProps> {
  static componentName: 'ChatPage';

  constructor(props: ChatPageProps) {
    super({
      ...props,
      onProfileGo: (e: Event) => this.handleGoToProfilePage(e),
      onChatCreate: () => this.handleCreateChat(),
      currentChat: '',
      currentChatName: '',
    });
  }

  componentDidMount(): void {
    store.dispatch(getChatsAction);
    this.initChatItemListener();
  }

  initChatItemListener() {
    const chatItems = document.querySelector('.chat_page_left_chats');
    console.log(chatItems);
    chatItems?.addEventListener('click', this.handleChatClick.bind(this));
  }

  removeChatItemListener() {
    const chatItems = document.querySelector('.chat_page_left_chats');
    chatItems?.removeEventListener('click', this.handleChatClick.bind(this));
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    appRouter.go('/profile');
  }

  handleCreateChat() {
    const { createChatRef } = this.refs;
    createChatRef.setProps({ isShow: true });
  }

  async startChatAction(chatId: string) {
    try {
      const startChatResponse = await chatApi.startChat(chatId);
      store.dispatch(createSocket, {
        token: startChatResponse.token,
        chatId,
      });
    } catch (error) {
      const errorResponse = error as APIError;
      console.error(errorResponse);
    }
  }

  removeAllConnections() {
    Object.values(store.getState().sockets).forEach((socket: WebSocket) => {
      socket.close();
    });
  }

  handleChatClick(e: Event) {
    console.log('e');
  }

  protected render(): string {
    const { currentChat, currentChatName } = this.props;
    return `
    <div>
    <h2 class="chat_main_title">Чаты</h2>
      {{{ Modal
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
          {{#each chats }}
          {{#with this}}
            {{{ ChatItem
                id=id
                title=title
                avatar=avatar
                last_message=last_message
                unread_count=unread_count
                currentChatName="${currentChatName}"
                activeClassName="${currentChat}"
            }}}
          {{/with}}
          {{/each}}
          </div>
        </section>
        <section class="chat_page_right">
        {{#if ${Boolean(currentChat)} }}
          {{{ ChatArea
              currentChatName="${currentChatName}"
              currentChatId="${currentChat}"
          }}}
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
});

const EnhancedChatPage = connectStore(mapStateToProps)(ChatPage);

export default EnhancedChatPage;
