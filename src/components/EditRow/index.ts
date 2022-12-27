import Block from 'core/Block';

import './editRow.css';

interface EditRowProps {
  type: string;
  name: string;
  value: string;
  title: string;
  onChange: () => void;
}

class EditRow extends Block {
  static componentName: 'EditRow';
  constructor({ name, type, value, onChange, title }: EditRowProps) {
    super({
      events: { change: onChange },
      name,
      type,
      value,
      title,
    });
  }

  protected render(): string {
    return `
      <div class="edit_row">
        <label class="edit_row_title">{{title}}</label>
        <div class="edit_row_input_container">
          <input
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
