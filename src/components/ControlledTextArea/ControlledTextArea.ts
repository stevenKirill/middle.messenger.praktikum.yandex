import Block from 'core/block/Block';
import { store } from 'core/store';
import { sendMessage } from 'services/chat/actions';
import { ControlledTextAreaProps } from './types';

export class ControlledTextArea extends Block<ControlledTextAreaProps> {
  static componentName = 'ControlledTextArea';

  constructor({ currentChatId }: ControlledTextAreaProps) {
    super({ currentChatId });
    this.setProps({
      onClick: () => this.handleSendMessage(),
      currentChatId,
      events: {
        // @ts-ignore
        keydown: this.handleEnter.bind(this),
      },
    });
  }

  handleSendMessage() {
    const textArea = document.querySelector('.chat_text_area') as HTMLTextAreaElement;
    const messageText = textArea.value;
    const chatId = this.props.currentChatId;
    store.dispatch(sendMessage, { chatId, messageText });
  }

  handleEnter(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    if (target.nodeName === 'TEXTAREA' && e.key === 'Enter') {
      const exactlyTextArea = e.target as HTMLTextAreaElement;
      const chatId = this.props.currentChatId;
      const trimmedMessage = exactlyTextArea.value.trim();
      store.dispatch(sendMessage, { chatId, messageText: trimmedMessage });
      exactlyTextArea.focus();
    }
  }

  protected render(): string {
    return `
    <div>
      <div class="chat_page_right_chatArea_send">
        {{{ ClipButton }}}
        <textarea class="chat_text_area"></textarea>
        {{{ SendButton onClick=onClick }}}
      </div>
      {{{ ErrorComponent error=text }}}
    </div>
    `;
  }
}
