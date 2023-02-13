import Block from 'core/block/Block';
import { ChatItemProps } from './types';

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

  getDate() {
    const date = this.props?.last_message?.time;
    if (date) {
      const d = new Date(date);
      let resMinutes = '';
      let resHours = '';
      const minutes = String(d.getMinutes());
      const hours = String(d.getHours());
      if (Number(minutes) < 10) {
        resMinutes = `0${minutes}`;
      } else {
        resMinutes = minutes;
      }
      if (Number(hours) < 10) {
        resHours = `0${hours}`;
      } else {
        resHours = hours;
      }
      return `${resHours}:${resMinutes}`;
    }
    return '';
  }

  protected render(): string {
    return `
      <div
        class="{{#if activeClassName}}{{activeClassName}}{{/if}} chat_page_left_chats_item"
        data-chat-id={{ id }}
      >
        <div class="chat_page_list_item_right">
          {{#if ${Boolean(this.props.avatar)}}}
            {{{ Avatar source="${this.props.avatar}" width="50" height="50" }}}
          {{else}}
            {{{ EmptyAvatar width="50" height="50" }}}
          {{/if}}
          <span>{{ title }}<span>
          <div class="chat_page_list_item_left">
            ${this.props?.last_message?.content || ''}
          </div>
        </div>
        <div class="chat_page_list_item_left">
          ${this.getDate()}
        </div>
      </div>
    `;
  }
}
