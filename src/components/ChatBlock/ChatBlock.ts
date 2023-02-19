import Block from 'core/block/Block';
import { store } from 'core/store';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { selectChat, getChatUsersAction, filterChats } from 'services/chat/actions';
import closeAllSockets from 'services/chat/closeAll';
import { selectChats, selectCurrentChat } from 'services/chat/selectors';
import { ChatBlockProps } from './types';

class ChatBlockClass extends Block<ChatBlockProps> {
  static componentName = 'ChatBlock';

  constructor(props: ChatBlockProps) {
    super({
      ...props,
      renderChats: () => {
        const chats = selectChats();
        const currentChat = selectCurrentChat();
        return (
          chats && chats.map((chat) => ({
            id: chat.id,
            title: chat.title,
            avatar: chat.avatar,
            last_message: chat.last_message,
            unread_count: chat.unread_count,
            activeClassName: () => (currentChat === chat.id ? 'active_chat' : ''),
            onClick: () => {
              store.dispatch({ messages: {} });
              closeAllSockets();
              store.dispatch(selectChat, chat.id);
              store.dispatch(filterChats, '');
              store.dispatch(getChatUsersAction, { chatId: chat.id });
            },
          }))
        );
      },
    });
  }

  protected render(): string {
    return `
    <div class="chat_page_left_chats">
      {{#if loading }}
        {{{ Loader }}}
      {{/if}}
      {{#if renderChats }}
      {{#each renderChats }}
        {{{ ChatItem
            id=this.id
            title=this.title
            avatar=this.avatar
            last_message=this.last_message
            unread_count=tis.unread_count
            onClick=onClick
            activeClassName=this.activeClassName
        }}}
      {{/each}}
      {{/if}}
    </div>
  `;
  }
}

const mapStateToProps = (state: AppState) => ({
  chats: state.chats.data,
  loading: state.chats.loading,
  error: state.chats.error,
  errorReason: state.chats.errorReason,
});

export const ChatBlock = connectStore(mapStateToProps)<ChatBlockProps>(ChatBlockClass);
