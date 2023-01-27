import Block from 'core/block/Block';
import './chatItem.css';

export interface ChatItemProps {
  id: number;
  title: string;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
  unread_count: string;
  avatar: string | null;
  activeClassName: string;
}

// TODO active class name for chat
class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';

  constructor({
    id,
    title,
    avatar,
    last_message,
    unread_count,
    activeClassName,
  }: ChatItemProps) {
    super({
      id,
      title,
      last_message,
      unread_count,
      avatar,
      activeClassName,
    });
  }

  protected render(): string {
    return `
      <div
        class="chat_page_left_chats_item"
        data-chat-id={{ id }}
      >
        <div class="chat_page_list_item_right">
          {{#if ${Boolean(this.props.avatar)}}}
            {{{ Avatar source="${this.props.avatar}" }}}
          {{else}}
            {{{ EmptyAvatar width="50" height="50" }}}
          {{/if}}
          <span>{{ title }}<span>
        </div>
        <div class="chat_page_list_item_left">
           {{ unread_count }}
        </div>
      </div>
    `;
  }
}

export default ChatItem;
