import Block from 'core/Block';

import './row.css';

interface RowProps {
  title: string;
  value: string;
}

class Row extends Block {
  static name = 'Row';

  constructor({ title, value }: RowProps) {
    super({ title, value });
  }

  protected render(): string {
    return `
    <div class="row_info">
      <div class="row_info_title">{{title}}</div>
      <div class="row_info_value">{{value}}</div>
    </div>
    `;
  }
}

export default Row;
