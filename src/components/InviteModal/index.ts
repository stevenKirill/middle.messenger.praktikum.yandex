import Block from 'core/block/Block';
import { store } from 'core/store';
import { searchUserByLoginAction } from 'services/user';

interface InviteModalProps {
  isShow: boolean;
  onSearch?: () => void;
  onCloseModal?: () => void;
  error: boolean;
  currentChatId: string;
}

class InviteModal extends Block<InviteModalProps> {
  static componentName = 'InviteModal';

  constructor({ isShow, error, currentChatId }: InviteModalProps) {
    super({ isShow, error, currentChatId });
    this.setProps({
      onSearch: () => this.handleSearch(),
      onCloseModal: () => this.handleCloseModal(),
      isShow: true,
      error: false,
      currentChatId,
    });
  }

  handleSearch() {
    const input = this.refs.user_login.querySelector('input') as HTMLInputElement;
    if (input.value !== '') {
      store.dispatch(searchUserByLoginAction, {
        login: input.value,
        chatId: this.props.currentChatId,
      });
    } else {
      this.setProps({
        ...this.props,
        error: true,
      });
    }
  }

  handleCloseModal() {
    this.setProps({
      ...this.props,
      isShow: false,
    });
  }

  protected render(): string {
    return `
    <div>
    {{#if ${this.props.isShow}}}
      <div class="overlay">
      <div class="modal_container">
        <div class="modal_container_header">
          <h3>Введите логин пользователя</h3>
          {{{ CloseButton
              className="modal_container_btn_close"
              text="x"
              onClick=onCloseModal
          }}}
        </div>
        <div class="modal_container_body">
        {{{ Input
            type="text"
            placeholder="логин"
            ref="user_login"
        }}}
        </div>
        <div class="modal_container_footer">
          {{{ Button textBtn="Искать" onClick=onSearch }}}
        </div>
        {{#if ${this.props.error}}}
        {{{ ErrorComponent
          className="align_center"
          error="Логин не может быть пустым"
        }}}
        {{else}}
        <div></div>
        {{/if}}
      </div>
      </div>
      {{else}}
      <div></div>
      {{/if}}
    `;
  }
}

export default InviteModal;
