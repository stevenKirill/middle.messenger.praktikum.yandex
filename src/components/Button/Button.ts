import Block from '../../core/Block';

import './button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, onClick}: ButtonProps) {
    super({ text, events: {click: onClick} });
  }

  protected render(): string {
    return `<button class="app_button">{{textBtn}}</button>`
  }
}
