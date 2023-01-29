import Block from 'core/block/Block';
import { store } from 'core/store';
import { createChatAction, getChatsAction } from 'services/chat';
import { ModalProps } from './types';
import './modal.css';

export class Modal extends Block<ModalProps> {
  static componentName = 'Modal';

  constructor({ isShow }: ModalProps) {
    super({ isShow });
    this.setProps({
      onPickName: () => this.handlePickChatName(),
      onCloseModal: () => this.handleCloseModal(),
      isShow: true,
    });
  }

  handlePickChatName() {
    const input = this.refs.chat_name.querySelector('input') as HTMLInputElement;
    store.dispatch(createChatAction, {
      title: input.value,
    });
    store.dispatch(getChatsAction);
    this.setProps({
      isShow: false,
    });
  }

  handleCloseModal() {
    this.setProps({
      isShow: false,
    });
  }

  protected render(): string {
    return `
    {{#if ${this.props.isShow}}}
      <div class="overlay">
      <div class="modal_container">
        <div class="modal_container_header">
          <h2>Название чата</h2>
          {{{ CloseButton
              className="modal_container_btn_close"
              text="x"
              onClick=onCloseModal
          }}}
        </div>
        <div class="modal_container_body">
        {{{ Input
            type="text"
            placeholder="Чат"
            ref="chat_name"
        }}}
        </div>
        <div class="modal_container_footer">
          {{{ Button textBtn="Ок" onClick=onPickName }}}
        </div>
      </div>
      </div>
      {{else}}
      <div></div>
      {{/if}}
    `;
  }
}
