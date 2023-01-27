import Block from 'core/block/Block';
import './chatArea.css';
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

  constructor({ currentChatName, currentChatId }: ChatAreaProps) {
    super({ currentChatName, currentChatId });

    this.setProps({
      ...this.props,
      onDeleteChat: () => this.handleDeleteChat(),
      onInvitePerson: () => this.handleInvitePerson(),
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
    return `
    <div>
      {{#if ${this.props.isShow}}}
        {{{ InviteModal isShow=isShow }}}
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
        <div class="chat_page_right_chatArea_messages">messages</div>
        {{{ ControlledTextArea }}}
      </div>
    </div>
  `;
  }
}

export default ChatArea;
