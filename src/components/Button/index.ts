import Block from 'core/Block';

import './button.css';

interface ButtonProps {
  textBtn: string;
  onClick: () => void;
}

class Button extends Block {
  constructor({textBtn, onClick}: ButtonProps) {
    super({ textBtn, events: {click: onClick} });
  }

  protected render(): string {
    return `<button class="app_button">{{textBtn}}</button>`
  }
}

export default Button;
