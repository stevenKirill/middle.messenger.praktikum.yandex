import Block from '../../core/Block';

import './editRow.css';

interface EditRowProps {
  type: string;
  name: string;
  value: string;
  title: string;
  onChange: () => void;
}

export class EditRow extends Block {
  constructor({ name, type, value, onChange }: EditRowProps) {
    super({
      events: {change: onChange },
      name,
      type,
      value,
    });
  }

  protected render(): string {
    return `
      <div class="edit_row">
        <label class="edit_row_title">{{title}}:</label>
        <div class="edit_row_input_container">
          <input class="edit_row_input" value={{value}} type={{type}} name={{name}} />
        </div>
      </div>
    `
  }
}
