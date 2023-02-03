import Block from 'core/block/Block';
import { store } from 'core/store';
import { deleteChatAction } from 'services/chat';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { findCurrentChat } from 'services/chat/utils';
import { ChatAreaProps } from './types';

export class ChatAreaClass extends Block<ChatAreaProps> {
  static componentName = 'ChatArea';

  constructor(props: ChatAreaProps) {
    super({
      ...props,
      onDeleteChat: () => this.handleDeleteChat(),
      onInvitePerson: () => this.handleInvitePerson(),
    });
  }

  handleDeleteChat() {
    const { currentChatId } = this.props;
    store.dispatch(deleteChatAction, { chatId: currentChatId });
  }

  handleInvitePerson() {
    const { inviteModal } = this.refs;
    inviteModal.setProps({ isShow: true });
  }

  protected render(): string {
    return `
    <div>
        {{{ InviteModal
            currentChatId=currentChatId
            ref="inviteModal"
        }}}
      <div class="chat_page_right_chatArea">
        <div class="chat_page_right_chatArea_header">
          <h3>{{ currentChatName }}</h3>
          <div class="chat_page_right_chatArea_header_buttons">
            {{{ Button
                textBtn="Пригласить в чат"
                className="mr10-right"
                onClick=onInvitePerson
            }}}
            {{{ Button
                textBtn="Удалить чат"
                onClick=onDeleteChat
            }}}
          </div>
        </div>
        <div class="chat_page_right_chatArea_messages">
        {{#each messages}}
        {{#with this}}
          {{{ ChatMessage
              content=content
              type=type
              id=id
              user_id=user_id
              time=time
          }}}
        {{/with}}
        {{/each}}
        </div>
        {{{ ControlledTextArea
            currentChatId=currentChatId
        }}}
      </div>
    </div>
  `;
  }
}

const mapStateToProps = (state: AppState) => ({
  messages: state.messages,
  currentChatName: findCurrentChat(state.chats.data, state.chats.currentChat)?.title,
  currentChatId: state.chats.currentChat,
});

export const ChatArea = connectStore(mapStateToProps)(ChatAreaClass);
