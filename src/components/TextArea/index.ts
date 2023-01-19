import Block from 'core/block/Block';
import './textArea.css';

export interface TextAreaProps {
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

class TextArea extends Block {
  static componentName = 'TextArea';

  constructor({
    name, type, placeholder, value, onChange, onFocus, onBlur,
  }: TextAreaProps) {
    super({
      events: {
        change: onChange,
        focus: onFocus,
        blur: onBlur,
      },
      name,
      type,
      placeholder,
      value,
    });
  }

  protected render(): string {
    return `
      <textarea
        class="chat_text_area"
        id="textArea1"
        ref="textArea"
      >
      </textarea>
    `;
  }
}

export default TextArea;
