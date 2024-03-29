import { Block } from 'core';
import { InputProps } from './types';

export class Input extends Block {
  static componentName = 'Input';

  constructor({
    name, type, placeholder, value = '', onInput, onFocus, onBlur,
  }: InputProps) {
    super({
      events: {
        input: onInput,
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
        data-name={{name}}
        {{#if value}}
        value={{value}}
        {{else}}
        value=""
        {{/if}}
      />
      <label for="custom_input" class="form__label">{{placeholder}}</label>
    </div>
    `;
  }
}
