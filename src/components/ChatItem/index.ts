import Block from 'core/block/Block';

export interface ChatUserProps {
}

class ChatItem extends Block {
  static componentName = 'ChatUser';

  protected render(): string {
    return `
    <div class="chat_page_left_chats_item"></div>
    `;
  }
}

export default ChatItem;
