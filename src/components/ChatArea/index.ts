import Block from 'core/block/Block';
import './chatArea.css';

export interface ChatAreaProps {
  messages: [];
  currentChatName: string;
}

class ChatArea extends Block {
  static componentName = 'ChatArea';

  constructor({ currentChatName }: ChatAreaProps) {
    super({ currentChatName });
  }

  protected render(): string {
    return `
    <div class="chat_page_right_chatArea">
      <div class="chat_page_right_chatArea_header">
        <h3>{{ currentChatName }}</h3>
        <div class="chat_page_right_chatArea_header_buttons">
          {{{ Button
              textBtn="Пригласить в чат"
              className="mr10-right"
          }}}
          {{{ Button
              textBtn="Удалить чат"
          }}}
        </div>
      </div>
      <div class="chat_page_right_chatArea_messages">messages</div>
      {{{ ControlledTextArea }}}
    </div>
  `;
  }
}

export default ChatArea;
