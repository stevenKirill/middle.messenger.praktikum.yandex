import { Block } from 'core';
import './input.css';

interface InputProps {
  value?: string;
  onInput?: () => void;
}

class FileInput extends Block {
  static componentName = 'FileInput';

  constructor({ value, onInput }: InputProps) {
    super({
      events: {
        input: onInput,
      },
      value,
    });
  }

  protected render(): string {
    return `
    <div class="form__group field">
      <input
        accept="image/*"
        className="file_input"
        id="logo"
        type="file"
      />
      <label htmlFor="logo">
        Загрузить файл
      </label>
    </div>
    `;
  }
}

export default FileInput;
