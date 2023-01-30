import Block from 'core/block/Block';
import { store } from 'core/store';
import { createSocket, getChatsAction } from 'services/chat';
import { APIError } from 'api/types';
import chatApi from 'api/chat';
import appRouter from 'core/router';
import { ChatPageProps } from './types';
import './chat.css';

class ChatPage extends Block<ChatPageProps> {
  static componentName: 'ChatPage';

  constructor(props: ChatPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onProfileGo: (e: Event) => this.handleGoToProfilePage(e),
      onChatCreate: () => this.handleCreateChat(),
      chats: store.getState().chats.data,
      currentChat: null,
      currentChatName: '',
    });
  }

  componentDidMount(): void {
    // запрос списка чатов
    const init = async () => {
      await store.dispatch(getChatsAction);
    };
    init();
    // подписка на обновление чатов
    store.on('changed', () => this.onChangeStoreCallback());
  }

  onChangeStoreCallback() {
    this.setProps({ ...this.props, chats: store.getState().chats.data });
    this.initChatItemListener();
  }

  initChatItemListener() {
    const chatItems = document.querySelector('.chat_page_left_chats');
    chatItems?.addEventListener('click', this.handleClickChat.bind(this));
  }

  removeChatItemListener() {
    const chatItems = document.querySelector('.chat_page_left_chats');
    chatItems?.removeEventListener('click', this.handleClickChat.bind(this));
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    appRouter.go('/profile');
  }

  handleCreateChat() {
    this.setProps({ ...this.props, isShow: true });
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

  handleClickChat(e: Event) {
    const target = e.target as HTMLDivElement;
    const closest = target.closest('[data-chat-id]') as HTMLDivElement;
    const chatName = closest.querySelector('span') as HTMLSpanElement;
    if (closest) {
      const currId: string = closest.dataset.chatId!;
      if (currId === this.props.currentChat) {
        return;
      }
      if (currId !== this.props.currentChat) {
        this.removeAllConnections();
      }
      this.startChatAction(currId as string);
      this.setProps({
        ...this.props,
        currentChat: currId,
        currentChatName: chatName.innerText as string,
      });
      this.removeChatItemListener();
    }
    this.initChatItemListener();
  }

  protected render(): string {
    return `
    <div>
    <h2 class="chat_main_title">Чаты</h2>
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
          {{#each chats}}
          {{#with this}}
            {{{ ChatItem
                id=id
                title=title
                avatar=avatar
                last_message=last_message
                unread_count=unread_count
                currentChatName=currentChatName
                activeClassName=${this.props.currentChat}
            }}}
          {{/with}}
          {{/each}}
          </div>
        </section>
        <section class="chat_page_right">
        {{#if ${this.props.currentChat}}}
          {{{ ChatArea
              currentChatName=currentChatName
              currentChatId=currentChat
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

export default ChatPage;
