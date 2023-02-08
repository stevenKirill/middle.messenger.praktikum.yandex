import Block from 'core/block/Block';
import { RowProps } from './types';

export class Row extends Block {
  static componentName = 'Row';

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
