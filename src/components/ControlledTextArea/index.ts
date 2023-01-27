import Block from 'core/block/Block';
import { store } from 'core/store';

interface ControlledTextAreaProps {
  currentChatId: string;
}

class ControlledTextArea extends Block {
  static componentName = 'ControlledTextArea';

  constructor({ currentChatId }: ControlledTextAreaProps) {
    super({ currentChatId });
    this.setProps({
      events: {
        click: (e: Event) => this.handleSendMessage(e),
      },
      currentChatId,
    });
  }

  handleSendMessage(e: Event) {
    // получить текущий сокет и отправить сообщение
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.nodeName !== 'BUTTON') {
      return;
    }
    const { textArea } = this.refs;
    const myTextArea = textArea as HTMLTextAreaElement;
    const message = myTextArea.value.trim();
    // @ts-ignore
    const currentChatSocket: WebSocket = store.getState().sockets[this.props.currentChatId];
    currentChatSocket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  protected render(): string {
    return `
    <div class="chat_page_right_chatArea_send">
      {{{ ClipButton }}}
      {{{ TextArea ref="textArea" }}}
      {{{ SendButton onClick=handleSendMessage }}}
    </div>
    {{{ ErrorComponent error=text }}}
    `;
  }
}

export default ControlledTextArea;
