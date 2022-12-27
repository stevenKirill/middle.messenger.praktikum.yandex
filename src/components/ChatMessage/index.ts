import Block from 'core/Block';
import './chatMessage.css';

interface ChatMessageProps {
  message: string;
  userName: string;
  time: string;
}

class ChatMessage extends Block {
  static componentName: 'ChatMessage';
  constructor({ message, userName, time }: ChatMessageProps) {
    super({ message, userName, time });
  }

  protected render(): string {
    return `
    <div class="chat_message_wrapper">
      <div class="chat_message_user"></div>
      <div class="chat_message_message"></div>
    </div>
    `
  }
}

export default ChatMessage;

