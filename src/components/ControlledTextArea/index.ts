import Block from 'core/Block';

export interface ControlledTextAreaProps {
  title: string;
  value: string;
}

class ControlledTextArea extends Block {
  static componentName: 'ControlledTextArea';

  constructor() {
    super();
    this.setProps({
      events: {
        click: (e: Event) => this.handleSendMessage(e),
      },
    });
  }

  handleSendMessage(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.nodeName !== 'BUTTON') {
      return;
    }
    const { textArea } = this.refs;
    const myTextArea = textArea as HTMLTextAreaElement;
    console.log(myTextArea.value);
  }

  protected render(): string {
    return `
    <div class="chat_page_right_chatArea_send">
      {{{ ClipButton }}}
      {{{
        TextArea
          ref="textArea"
      }}}
      {{{ SendButton onClick=handleSendMessage }}}
    </div>
    `;
  }
}

export default ControlledTextArea;
