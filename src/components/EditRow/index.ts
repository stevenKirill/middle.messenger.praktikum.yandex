import Block from 'core/Block';

import './editRow.css';

interface EditRowProps {
  type?: string;
  name?: string;
  value?: string;
  title?: string;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

class EditRow extends Block {
  static componentName: 'EditRow';

  constructor({
    name,
    type,
    value,
    title,
  }: EditRowProps) {
    super({
      name,
      type,
      value,
      title,
    });
    this.setProps({
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    });
  }

  handleFocus() {
    console.log('focus');
  }

  // TODO handle error
  handleBlur() {
    console.log('blur');
  }

  protected render(): string {
    return `
      <div class="edit_row">
        <label class="edit_row_title">{{title}}</label>
        <div class="edit_row_input_container">
          <Input
            class="edit_row_input"
            value={{value}}
            type={{type}}
            name={{name}}
          />
        </div>
      </div>
    `;
  }
}
export default EditRow;
