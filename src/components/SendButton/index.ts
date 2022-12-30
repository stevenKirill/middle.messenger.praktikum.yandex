import Block from 'core/Block';
import './sendButton.css';

interface SendButtonProps {
  onClick: () => void;
}

class SendButton extends Block {
  static name: 'SendButton';

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
