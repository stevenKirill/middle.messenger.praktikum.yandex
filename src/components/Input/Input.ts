import Block from '../../core/Block';

import './input.css';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  onChange: () => void;
}

export class Input extends Block {
  constructor({ name, type, placeholder, onChange }: InputProps) {
    super({
      events: {change: onChange },
      name,
      type,
      placeholder,
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
        id='custom_input'
      />
      <label for="custom_input" class="form__label">{{placeholder}}</label>
    </div>
    `
  }
}
