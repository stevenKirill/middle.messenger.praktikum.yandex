import Block from 'core/block/Block';
import { ChangeAvatarProps } from './types';

export class ChangeAvatar extends Block<ChangeAvatarProps> {
  static componentName = 'ChangeAvatar';

  constructor(props: ChangeAvatarProps) {
    super({ ...props });
    this.setProps({
      onCloseModal: () => this.handleCloseModal(),
      isShowModal: false,
      currentChatId: props.currentChatId,
      onInput: (e: Event) => this.handleInput(e),
      onUpload: () => this.handleUpload(),
    });
  }

  // TODO повесить обработчик
  componentDidUpdate(
    prevProps: ChangeAvatarProps,
    nextProps: ChangeAvatarProps,
  ) {
    if (prevProps.isShowModal === false && nextProps.isShowModal === true) {
      const el = document.querySelector('.modal_container_body');
      console.log(el);
    }
    return true;
  }

  handleCloseModal() {
    this.setProps({ ...this.props, isShowModal: false });
  }

  handleInput(e: Event) {
    console.log(e);
  }

  handleUpload() {
    console.log('upload');
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
              {{{ ErrorComponent
                  className="align_center"
                  error=error
                  ref="errorRef"
              }}}
            </div>
            <div class="modal_container_footer">
              {{{ Button textBtn="Изменить" onClick=onInput }}}
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
