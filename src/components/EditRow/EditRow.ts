import Block from 'core/block/Block';
import './editRow.css';

export class EditRow extends Block {
  static componentName = 'EditRow';

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
