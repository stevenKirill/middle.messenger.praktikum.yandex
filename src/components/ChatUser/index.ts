import Block from 'core/Block';
import './chatUser.css';

export interface ChatUserProps {
}
// TODO отрисовка пользователя чата
// возможность перейти в сам чат
class ChatUser extends Block {
  constructor({}: ChatUserProps) {
    super({ });
  }

  protected render(): string {
    return `
    <div class="chat_page_left_chats_item"></div>
    `
  }
}

export default ChatUser;

