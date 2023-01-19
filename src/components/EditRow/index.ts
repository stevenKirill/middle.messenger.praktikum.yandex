import Block from 'core/block/Block';
import './editRow.css';
import { validateFactory } from 'utils/validation';

interface EditRowProps {
  type?: string;
  name?: string;
  value?: string;
  title?: string;
  onChange?: (e: Event) => void;
  onFocus?: () => void;
  onBlur?: (e: Event) => void;
  error?: string | null;
}

class EditRow extends Block<EditRowProps> {
  static componentName = 'EditRow';

  constructor({
    name,
    type,
    value,
    title,
    error,
  }: EditRowProps) {
    super({
      name,
      type,
      value,
      title,
      error,
    });

    // this.state = {
    //   [this.props.name as string]: this.props.value,
    // };

    this.setProps({
      onBlur: (e: Event) => this.handleBlur(e),
      error: null,
      onChange: (e: Event) => this.handleChange(e),
    });
  }

  handleChange(e: Event) {
    const { value } = e.target! as HTMLInputElement;
    console.log(value);
  }

  handleBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    const isValid = validateFactory(target.name, target.value);
    if (!this.props.error && isValid !== '') {
      this.setProps({
        ...this.props,
        error: isValid,
      });
    } else {
      this.setProps({
        ...this.props,
        error: '',
      });
    }
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
        {{{ ErrorComponent
          error=error
          className="error_center"
          ref="errorRef"
        }}}
        </div>
      </div>
    `;
  }
}
export default EditRow;
