import Block from 'core/Block';

export interface ChatAreaProps {
  messages: [];
}

class ChatArea extends Block {
  static componentName: 'ChatArea';
  protected render(): string {
    return `
    <div class="chat_page_right_chatArea">
      <div class="chat_page_right_chatArea_header"> header</div>
      <div class="chat_page_right_chatArea_messages">messages</div>
      {{{ TextArea }}}
    </div>
  `
  }
}

export default ChatArea;
