import Block from 'core/Block';

import './button.css';

interface ButtonProps {
  textBtn: string;
  onClick: () => void;
  type: string;
}

class Button extends Block {
  static name: 'Button';

  constructor({ textBtn, onClick, type = 'button' }: ButtonProps) {
    super({ textBtn, type, events: { click: onClick } });
  }

  protected render(): string {
    return `
      <button type={{type}} class="app_button">{{textBtn}}</button>
    `;
  }
}

export default Button;
