import Block from 'core/Block';
import { validateMessage } from 'utils/validation';

export interface ControlledTextAreaProps {
  onClick: () => void;
  onFocus: () => void;
  text: string;
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

  // handleFocus(e: Event) {
  //   const target = e.target as HTMLTextAreaElement;
  //   console.log(target.value);
  // }

  // handleBlur(e: Event) {
  //   const target = e.target as HTMLTextAreaElement;
  //   console.log(target.value);
  // }

  handleSendMessage(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.nodeName !== 'BUTTON') {
      return;
    }
    const { textArea } = this.refs;
    const myTextArea = textArea as HTMLTextAreaElement;
    const validate = validateMessage(myTextArea.value);
    if (validate) {
      this.setProps({
        text: validate,
      });
    }
    console.log(validate);
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
    {{{ ErrorComponent error=text }}}
    `;
  }
}

export default ControlledTextArea;
