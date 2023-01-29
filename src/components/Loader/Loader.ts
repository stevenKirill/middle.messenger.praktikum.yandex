import { Block } from 'core';
import './loader.css';

export class Loader extends Block {
  static componentName = 'Loader';

  protected render(): string {
    return `
      <div class="lds-dual-ring"></div>
    `;
  }
}
