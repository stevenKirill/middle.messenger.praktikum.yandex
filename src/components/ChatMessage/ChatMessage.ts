import Block from 'core/block/Block';
import { ChatMessageProps } from './types';

export class ChatMessage extends Block {
  static componentName = 'ChatMessage';

  constructor({
    id, time, user_id, content, type, formatTime,
  }: ChatMessageProps) {
    super({
      id, time, user_id, content, type, formatTime,
    });
  }

  protected render(): string {
    return `
    <div class="chat_message_wrapper">
      <div class="chat_message_content">{{ content }}</div>
      <div class="chat_message_time">{{ formatTime }}</div>
    </div>
    `;
  }
}
