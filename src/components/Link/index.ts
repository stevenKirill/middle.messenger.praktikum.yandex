import Block from 'core/block/Block';
import './link.css';

interface LinkProps {
  text: string;
  url: string;
  className: string;
  onClick: () => void;
}

class Link extends Block<LinkProps> {
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

export default Link;
