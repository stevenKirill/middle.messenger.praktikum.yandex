import { Block } from 'core';

interface GroupedMessagesProps {
  groupedMessages: [];
}

export class GroupedMessages extends Block<GroupedMessagesProps> {
  static componentName = 'GroupedMessages';

  protected render(): string {
    return `
    <div class="messages_container">
      <div class="messages_container_title">{{ timeTitle }}</div>
      {{#each messages }}
      {{{ ChatMessage
          content=this.content
          type=this.type
          id=this.id
          user_id=this.ser_id
          time=this.time
          formatTime=this.formatTime
      }}}
      {{/each}}
    </div>
  `;
  }
}
