import Block from 'core/Block';
import './textArea.css';

interface TextAreaProps {
  title: string;
  value: string;
}

class TextArea extends Block {
  constructor({ }: TextAreaProps) {
    super({ });
  }

  protected render(): string {
    return `
    <div class="chat_page_right_chatArea_send">
      {{{ ClipButton }}}
      <textarea
        class="chat_text_area"
        id="textArea1"
      >
      </textarea>
      {{{ SendButton }}}
    </div>
    `
  }
}

export default TextArea;

