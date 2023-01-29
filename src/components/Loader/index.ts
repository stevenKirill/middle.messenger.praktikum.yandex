import { Block } from 'core';
import './loader.css';

class Loader extends Block {
  static componentName = 'Loader';

  protected render(): string {
    return `
      <div class="lds-dual-ring"></div>
    `;
  }
}

export default Loader;
