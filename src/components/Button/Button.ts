import Block from 'core/block/Block';
import './button.css';
import { ButtonProps } from './types';

export class Button extends Block {
  static componentName = 'Button';

  constructor({
    textBtn, onClick, type = 'button', className,
  }: ButtonProps) {
    super({
      textBtn, type, events: { click: onClick }, className,
    });
  }

  protected render(): string {
    return `
      <button type={{type}} class="app_button {{className}}">{{textBtn}}</button>
    `;
  }
}
