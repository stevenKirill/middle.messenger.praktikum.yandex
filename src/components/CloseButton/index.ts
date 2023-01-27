import Block from 'core/block/Block';

interface CloseButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
}

class CloseButton extends Block<CloseButtonProps> {
  static componentName = 'CloseButton';

  constructor({ className, onClick, text }: CloseButtonProps) {
    super({ className, onClick, text });
    // @ts-ignore
    this.setProps({ events: { click: onClick }, className, text });
  }

  protected render(): string {
    return `
      <button class={{className}}>{{text}}</button>
    `;
  }
}

export default CloseButton;
