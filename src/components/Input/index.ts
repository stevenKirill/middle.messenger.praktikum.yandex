import Block from 'core/Block';

import './input.css';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

class Input extends Block {
  static componentName: 'Input';

  constructor({
    name, type, placeholder, value, onChange, onFocus, onBlur,
  }: InputProps) {
    super({
      events: {
        change: onChange,
        focusin: onFocus,
        focusout: onBlur,
      },
      name,
      type,
      placeholder,
      value,
    });
  }

  protected render(): string {
    return `
    <div class="form__group field">
      <input
        type={{type}}
        class="form__field"
        name={{name}}
        placeholder={{placeholder}}
        value={{value}}
        data-name={{name}}
      />
      <label for="custom_input" class="form__label">{{placeholder}}</label>
    </div>
    `;
  }
}

export default Input;
