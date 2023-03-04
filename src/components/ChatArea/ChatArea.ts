import Block from 'core/block/Block';
import { store } from 'core/store';
import { deleteChatAction } from 'services/chat/actions';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import findCurrentChat from 'services/chat/find';
import { ChatAreaProps } from './types';

class ChatAreaClass extends Block<ChatAreaProps> {
  static componentName = 'ChatArea';

  constructor(props: ChatAreaProps) {
    super({
      ...props,
      onDeleteChat: () => this.handleDeleteChat(),
      onInvitePerson: () => this.handleInvitePerson(),
      onChangeAvatar: () => this.handleChangeAvatar(),
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

  handleChangeAvatar() {
    const { changeAvatar } = this.refs;
    changeAvatar.setProps({ isShowModal: true });
  }

  protected render(): string {
    return `
    <div class="chat_page_flex">
      <div>
        {{{ InviteModal
            currentChatId=currentChatId
            ref="inviteModal"
        }}}
        {{{ ChangeAvatar
            currentChatId=currentChatId
            ref="changeAvatar"
        }}}
        <div class="chat_page_right_chatArea">
          <div class="chat_page_right_chatArea_header">
            <h3>{{ currentChatName }}</h3>
            <div class="chat_page_right_chatArea_header_buttons">
              {{{ Button
                  textBtn="Добавить"
                  className="mr10-right smallBtn"
                  onClick=onInvitePerson
              }}}
              {{{ Button
                  className="mr10-right smallBtn"
                  textBtn="Удалить чат"
                  onClick=onDeleteChat
              }}}
              {{{ Button
                  className="smallBtn"
                  textBtn="Изменить аватар"
                  onClick=onChangeAvatar
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

export const ChatArea = connectStore(mapStateToProps)<ChatAreaProps>(ChatAreaClass);
