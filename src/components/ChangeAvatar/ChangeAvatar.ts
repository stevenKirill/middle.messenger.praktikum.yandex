import Block from 'core/block/Block';
import { store } from 'core/store';
import { changeChatAvatarAction } from 'services/chat/actions';
import { ChangeAvatarProps } from './types';

export class ChangeAvatar extends Block<ChangeAvatarProps> {
  static componentName = 'ChangeAvatar';

  constructor(props: ChangeAvatarProps) {
    super({ ...props });
    this.setProps({
      onCloseModal: () => this.handleCloseModal(),
      onSend: () => this.handleSend(),
      isShowModal: false,
      currentChatId: props.currentChatId,
      file: null,
      fileName: '',
    });
  }

  createEvents() {
    const el = document.querySelector('.change_modal_wrapper');
    const input = document.querySelector('.change_modal_input');
    if (el) {
      el.addEventListener('click', this.handleInput.bind(this));
    }
    if (input) {
      input.addEventListener('input', this.handleChooseFile.bind(this));
    }
  }

  componentDidUpdate(
    prevProps: ChangeAvatarProps,
    nextProps: ChangeAvatarProps,
  ) {
    if (prevProps.isShowModal === false && nextProps.isShowModal === true) {
      setTimeout(() => {
        this.createEvents();
      }, 0);
    }
    return true;
  }

  handleSend() {
    const { file } = this.props;
    if (file) {
      const formData = new FormData();
      formData.append('avatar', this.props.file as Blob);
      formData.append('chatId', this.props.currentChatId);
      store.dispatch(changeChatAvatarAction, formData);
    }
  }

  handleCloseModal() {
    this.setProps({
      ...this.props,
      isShowModal: false,
      file: null,
      fileName: '',
    });
  }

  handleInput(e: Event) {
    const target = e.currentTarget as HTMLDivElement;
    const input = target.querySelector('input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  handleChooseFile(e: Event) {
    const target = e.target as HTMLInputElement;
    let file = null;
    let fileName = '';
    if (target.files) {
      file = target.files[0];
      fileName = target.files[0].name;
    }
    this.setProps({
      ...this.props,
      file,
      fileName,
    });
    this.createEvents();
  }

  protected render(): string {
    return `
      <div class="change_avatar">
        {{#if ${this.props.isShowModal}}}
          <div class="overlay" style="background-color:rgba(0, 0, 0, 0.5);">
            <div class="modal_container">
              <div class="modal_container_header">
                <h3>Выберите файл</h3>
                {{{ CloseButton
                    className="modal_container_btn_close"
                    text="x"
                    onClick=onCloseModal
                }}}
              </div>
              <div class="modal_container_body">
                <div class="change_modal_wrapper">
                  <input
                    accept="image/*"
                    class="change_modal_input"
                    id="chatFiles"
                    multiple
                    type="file"
                  />
                  <label class="change_modal_label" htmlFor="chatFiles">
                    Выберите файл
                  </label>
                </div>
              </div>
              {{#if ${this.props.fileName !== ''}}}
                <div>${this.props.fileName}</div>
              {{/if}}
              <div class="modal_container_footer">
                {{{ Button textBtn="Изменить" onClick=onSend }}}
              </div>
            </div>
          </div>
        {{else}}
          <div></div>
        {{/if}}
      </div>
    `;
  }
}
