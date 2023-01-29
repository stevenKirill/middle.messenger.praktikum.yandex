import Block from 'core/block/Block';
import { CloseButtonProps } from './types';

export class CloseButton extends Block<CloseButtonProps> {
  static componentName = 'CloseButton';

  constructor({ className, onClick, text }: CloseButtonProps) {
    super({ className, onClick, text });
    this.setProps({ events: { click: onClick }, className, text });
  }

  protected render(): string {
    return `
      <button class={{className}}>{{text}}</button>
    `;
  }
}
