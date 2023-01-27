import Block from 'core/block/Block';

interface ChatMessageProps {
  content: string;
  type: string;
  id: string;
  user_id: string;
  time: string;
}

class ChatMessage extends Block {
  static componentName = 'ChatMessage';

  constructor({
    id, time, user_id, content, type,
  }: ChatMessageProps) {
    super({
      id, time, user_id, content, type,
    });
  }

  protected render(): string {
    return `
    <div class="chat_message_wrapper">
      <div class="chat_message_user">{{ user_id }}</div>
      <div class="chat_message_message">{{ time }}</div>
      <div class="chat_message_message">{{ content }}</div>
    </div>
    `;
  }
}

export default ChatMessage;
