import Block from 'core/Block';
import './textArea.css';

export interface TextAreaProps {
  title: string;
  value: string;
}

class TextArea extends Block {
  static componentName: 'TextArea';

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
    `;
  }
}

export default TextArea;

