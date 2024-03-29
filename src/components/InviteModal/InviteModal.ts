import Block from 'core/block/Block';
import { store } from 'core/store';
import { searchUserByLoginAction } from 'services/user';
import { ErrorComponentProps } from 'components/ErrorComponent/types';
import { InviteModalProps } from './types';

export class InviteModal extends Block<InviteModalProps> {
  static componentName = 'InviteModal';

  constructor(props: InviteModalProps) {
    super({ ...props });
    this.setProps({
      onSearch: () => this.handleSearch(),
      onCloseModal: () => this.handleCloseModal(),
      isShow: false,
      currentChatId: props.currentChatId,
      onInput: () => this.handleInput(),
    });
  }

  handleSearch() {
    const { userLogin, errorRef } = this.refs;
    const input = userLogin.node!.querySelector('input') as HTMLInputElement;
    if (input.value === '') {
      errorRef.setProps({ error: 'Поле не может быть пустым' });
      return;
    }
    store.dispatch(searchUserByLoginAction, {
      login: input.value,
      chatId: this.props.currentChatId,
    });
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.setProps({ ...this.props, isShow: false });
  }

  handleInput() {
    const { errorRef } = this.refs;
    const errorProps = errorRef.props as ErrorComponentProps;
    if (errorProps.error !== '') {
      errorRef.setProps({ error: '' });
    }
  }

  protected render(): string {
    return `
    <div>
    {{#if ${this.props.isShow}}}
      <div class="overlay" style="background-color:rgba(0, 0, 0, 0.5);">
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
            ref="userLogin"
            onInput=onInput
        }}}
        {{{ ErrorComponent
            className="align_center"
            error=error
            ref="errorRef"
        }}}
        </div>
        <div class="modal_container_footer">
          {{{ Button textBtn="Искать" onClick=onSearch }}}
        </div>
      </div>
      </div>
      {{else}}
      <div></div>
      {{/if}}
    `;
  }
}
