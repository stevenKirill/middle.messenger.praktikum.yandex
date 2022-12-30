import Block from 'core/Block';
import './link.css';

interface LinkProps {
  text?: string;
  url?: string;
  className?: string;
}

class Link extends Block<LinkProps> {
  static componentName: 'Link';

  constructor({ className, url, text }: LinkProps) {
    super({ className, url, text });
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
