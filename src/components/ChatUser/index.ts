import Block from 'core/Block';

export interface ChatUserProps {
}
// TODO отрисовка пользователя чата
// возможность перейти в сам чат
class ChatUser extends Block {
  static name = 'ChatUser';

  protected render(): string {
    return `
    <div class="chat_page_left_chats_item"></div>
    `;
  }
}

export default ChatUser;
