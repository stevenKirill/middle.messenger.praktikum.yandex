import Block from 'core/block/Block';

export interface ChatAreaProps {
  messages: [];
}

class ChatArea extends Block {
  static componentName = 'ChatArea';

  protected render(): string {
    return `
    <div class="chat_page_right_chatArea">
      <div class="chat_page_right_chatArea_header">
      <h3>Название чата</h3>
      {{{ Button textBtn="Пригласить в чат" }}}
      </div>
      <div class="chat_page_right_chatArea_messages">messages</div>
      {{{ ControlledTextArea }}}
    </div>
  `;
  }
}

export default ChatArea;
