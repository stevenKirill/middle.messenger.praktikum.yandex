import Block from 'core/block/Block';
import { ControlledTextAreaProps } from './types';

export class ControlledTextArea extends Block {
  static componentName = 'ControlledTextArea';

  constructor({ currentChatId }: ControlledTextAreaProps) {
    super({ currentChatId });
    this.setProps({
      events: {
        click: (e: Event) => this.handleSendMessage(e),
      },
      currentChatId,
    });
    console.log('render lol');
  }

  handleSendMessage(e: Event) {
    e.preventDefault();
    console.log(e);
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
