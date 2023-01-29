import Block from 'core/block/Block';
import { SendButtonProps } from './types';
import './sendButton.css';

export class SendButton extends Block {
  static componentName = 'SendButton';

  constructor({ onClick }: SendButtonProps) {
    super({ events: { click: onClick } });
  }

  protected render(): string {
    return `
    <button class="chat_button"></button>
    `;
  }
}
