import Block from '../../core/Block';

import './avatarModal.css';

interface AvatarModalProps {
  isError: string;
}

export class AvatarModal extends Block {
  constructor({ isError }: AvatarModalProps) {
    super({ isError });
  }

  protected render(): string {
    return `
    <div class="overlay"></div>
      <div class="modal_container">
        <div class="modal_container_header">
          <h2>Загрузить файл</h2>
          <button class="modal_container_btn_close">x</button>
        </div>
        <div class="modal_container_body">
          <input
            accept="image/*"
            className="modal_container_body_input"
            id="logo"
            type="file"
          />
          <label htmlFor="logo">
            Выберите файл на компьютере
          </label>
        </div>
        <div class="modal_container_footer">
          {{> "Button/Button" textBtn="Поменять"}}
        </div>
        {{#if isError}}
        <div>Нужно выбрать файл</div>
        {{/if}}
    </div>
    `
  }
}
