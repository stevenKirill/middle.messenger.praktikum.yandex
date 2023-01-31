import Block from 'core/block/Block';
import { ChatItemProps } from './types';
import './chatItem.css';

export class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';

  constructor({
    id,
    title,
    avatar,
    last_message,
    unread_count,
    onClick,
    activeClassName,
  }: ChatItemProps) {
    super({
      id,
      title,
      last_message,
      unread_count,
      avatar,
      events: {
        click: onClick,
      },
      activeClassName,
    });
  }

  protected render(): string {
    return `
      <div
        class="${this.props.activeClassName} chat_page_left_chats_item"
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
