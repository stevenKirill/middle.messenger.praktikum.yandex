import { Block } from 'core';
import { appHTTP } from 'utils/http';
import logo from '../../assets/tg.png';
import './input.css';

interface FileInputProps {
  onOpen: () => void;
  onInput: () => void;
  source: string;
}

class FileInput extends Block<FileInputProps> {
  static componentName = 'FileInput';

  constructor({ source, onOpen, onInput }: FileInputProps) {
    super({ events: { click: onOpen, input: onInput }, source });
  }

  getAvatar() {
    return this.props.source ? `${appHTTP.baseUrl}/resources/${this.props.source}` : logo;
  }

  protected render(): string {
    return `
    <div class="file_input_wrapper">
      <img
        class="file_input_wrapper_image"
        src="${this.getAvatar()}"
        width="200"
        height="200"
      />
      <input
        accept="image/*"
        class="file_input_wrapper_input"
        id="logo"
        type="file"
      />
      <label htmlFor="logo" class="file_input_wrapper_label">
        Загрузить файл
      </label>
    </div>
    `;
  }
}

export default FileInput;
