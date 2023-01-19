import Block from 'core/block/Block';
import './sendButton.css';

interface SendButtonProps {
  onClick: () => void;
}

class SendButton extends Block {
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

export default SendButton;
