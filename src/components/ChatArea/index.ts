import Block from 'core/block/Block';
import { store } from 'core/store';
import { deleteChatAction, getChatsAction } from 'services/chat';

export interface ChatAreaProps {
  messages?: [];
  currentChatName: string;
  currentChatId: string;
  onDeleteChat?: () => void;
  onInvitePerson?: () => void;
  isShow?: boolean;
}

class ChatArea extends Block<ChatAreaProps> {
  static componentName = 'ChatArea';

  constructor({ currentChatName, currentChatId, messages }: ChatAreaProps) {
    super({ currentChatName, currentChatId, messages });

    this.setProps({
      ...this.props,
      onDeleteChat: () => this.handleDeleteChat(),
      onInvitePerson: () => this.handleInvitePerson(),
      messages: [],
    });
  }

  componentDidMount() {
    store.on('changed', () => this.onChangeStoreCallback());
  }

  onChangeStoreCallback() {
    this.setProps({
      ...this.props,
      messages: store.getState().messages,
    });
  }

  handleDeleteChat() {
    store.dispatch(deleteChatAction, {
      chatId: this.props.currentChatId as string,
    });
    store.dispatch(getChatsAction);
  }

  handleInvitePerson() {
    this.setProps({
      ...this.props,
      isShow: true,
    });
  }

  protected render(): string {
    console.log(this.props.messages, '=> сообщения');
    return `
    <div>
      {{#if ${this.props.isShow}}}
        {{{ InviteModal
            isShow=isShow
            currentChatId=currentChatId
        }}}
      {{else}}
        <div></div>
      {{/if}}
      <div class="chat_page_right_chatArea">
        <div class="chat_page_right_chatArea_header">
          <h3>{{ currentChatName }}</h3>
          <div class="chat_page_right_chatArea_header_buttons">
            {{{ Button
                textBtn="Пригласить в чат"
                className="mr10-right"
                onClick=onInvitePerson
            }}}
            {{{ Button
                textBtn="Удалить чат"
                onClick=onDeleteChat
            }}}
          </div>
        </div>
        <div class="chat_page_right_chatArea_messages">
        {{#each messages}}
        {{#with this}}
          {{{ ChatMessage
              content=content
              type=type
              id=id
              user_id=user_id
              time=time
          }}}
        {{/with}}
        {{/each}}
        </div>
        {{{
          ControlledTextArea
          currentChatId=currentChatId
        }}}
      </div>
    </div>
  `;
  }
}

export default ChatArea;
