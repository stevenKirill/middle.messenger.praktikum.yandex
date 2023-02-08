import Block from 'core/block/Block';
import { LinkProps } from './types';

export class Link extends Block<LinkProps> {
  static componentName = 'Link';

  constructor({
    className, url, text, onClick,
  }: LinkProps) {
    super({
      className, url, text, events: { click: onClick },
    });
  }

  protected render(): string {
    return `
    <a
      class="main_link ${this.props.className}"
      href={{url}}>{{text}}
    </a>
  `;
  }
}
