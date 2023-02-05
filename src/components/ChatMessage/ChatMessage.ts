import Block from 'core/block/Block';
import { ChatMessageProps } from './types';

export class ChatMessage extends Block {
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
      <div class="chat_message_user">Пользователь: {{ user_id }}</div>
      <div class="chat_message_message">{{ time }}</div>
      <div class="chat_message_message">{{ content }}</div>
    </div>
    `;
  }
}
