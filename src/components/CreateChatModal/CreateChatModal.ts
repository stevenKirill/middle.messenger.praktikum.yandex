import Block from 'core/block/Block';
import { store } from 'core/store';
import { createChatAction } from 'services/chat/actions';
import { CreateChatModalProps } from './types';

export class CreateChatModal extends Block<CreateChatModalProps> {
  static componentName = 'CreateChatModal';

  constructor(props: CreateChatModalProps) {
    super({
      ...props,
      onCreate: () => this.handleCreateChat(),
      onCloseModal: () => this.handleCloseModal(),
      isShow: false,
      error: '',
    });
  }

  handleCreateChat() {
    const { chatName, error } = this.refs;
    const input = chatName.node?.querySelector('input')!;
    if (input.value === '') {
      error.setProps({ error: 'Имя не может быть пустым' });
      return;
    }
    store.dispatch(createChatAction, { title: input.value });
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.setProps({ ...this.props, isShow: false });
  }

  protected render(): string {
    const { isShow } = this.props;
    return `
    {{#if ${isShow}}}
      <div class="overlay" style="background-color:rgba(0, 0, 0, 0.5);">
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
            ref="chatName"
        }}}
        {{{ ErrorComponent
            error=error
            ref="error"
        }}}
        </div>
        <div class="modal_container_footer">
          {{{ Button textBtn="Ок" onClick=onCreate }}}
        </div>
      </div>
      </div>
      {{else}}
      <div></div>
      {{/if}}
    `;
  }
}
