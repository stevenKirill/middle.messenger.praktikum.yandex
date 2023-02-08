import { Block } from 'core';

export class Loader extends Block {
  static componentName = 'Loader';

  protected render(): string {
    return `
      <div class="lds-dual-ring"></div>
    `;
  }
}
