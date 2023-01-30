import Block from 'core/block/Block';
import { store } from 'core/store';
import { createChatAction, getChatsAction } from 'services/chat';
import { CreateChatModalProps } from './types';
import './modal.css';

export class Modal extends Block<CreateChatModalProps> {
  static componentName = 'Modal';

  constructor(props: CreateChatModalProps) {
    super({
      ...props,
      onPickName: () => this.handlePickChatName(),
      onCloseModal: () => this.handleCloseModal(),
      isShow: false,
    });
  }

  handlePickChatName() {
    console.log('handlePickChatName');
  }

  handleCloseModal() {
    this.setProps({ ...this.props, isShow: false });
  }

  protected render(): string {
    const { isShow } = this.props;
    return `
    {{#if ${isShow}}}
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
