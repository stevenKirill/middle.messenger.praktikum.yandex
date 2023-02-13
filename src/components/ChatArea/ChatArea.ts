import Block from 'core/block/Block';
import { store } from 'core/store';
import { deleteChatAction } from 'services/chat/actions';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import findCurrentChat from 'services/chat/find';
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
    <div class="chat_page_flex">
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
                  textBtn="+"
                  className="mr10-right smallBtn"
                  onClick=onInvitePerson
              }}}
              {{{ Button
                  className="smallBtn"
                  textBtn="Удалить чат"
                  onClick=onDeleteChat
              }}}
            </div>
          </div>
          <div class="chat_page_right_chatArea_messages">
          {{#each messages }}
            {{{ GroupedMessages
                timeTitle=this.[0]
                messages=this.[1]
            }}}
          {{/each}}
          </div>
          {{{ ControlledTextArea currentChatId=currentChatId }}}
        </div>
      </div>
      {{{ ChatUsers }}}
    </div>
  `;
  }
}

const mapStateToProps = (state: AppState) => {
  // TODO разобраться почему эта функция не вызывается
  console.log('вызов mapStateToProps');
  const sortedGroups = Object.entries(state.messages).sort((a, b) => {
    const firstDate = new Date(a[0]).getTime();
    const secondDate = new Date(b[0]).getTime();
    return firstDate - secondDate;
  });
  return {
    messages: sortedGroups,
    currentChatName: findCurrentChat(
      state.chats.data,
      state.chats.currentChat as number,
    ),
    currentChatId: state.chats.currentChat,
  };
};

export const ChatArea = connectStore(mapStateToProps)(ChatAreaClass);
