import Block from 'core/block/Block';
import './editRow.css';

interface EditRowProps {
  type?: string;
  name?: string;
  value?: string;
  title?: string;
  onChange?: (e: Event) => void;
  onFocus?: () => void;
  onBlur: (e: Event) => void;
}

class EditRow extends Block<EditRowProps> {
  static componentName = 'EditRow';

  constructor({
    name,
    type,
    value,
    title,
    onBlur,
  }: EditRowProps) {
    super({
      name,
      type,
      value,
      title,
      onBlur,
    });
  }

  protected render(): string {
    return `
      <div class="edit_row">
        <label class="edit_row_title">{{title}}</label>
        <div class="edit_row_input_container">
        {{{ Input
          name=name
          value=value
          type=type
          placeholder=title
          onBlur=onBlur
          ref=name
          onInput=onChange
        }}}
        </div>
      </div>
    `;
  }
}
export default EditRow;
