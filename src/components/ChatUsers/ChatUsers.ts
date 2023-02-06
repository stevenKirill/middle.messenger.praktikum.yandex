import Block from 'core/block/Block';
import { store } from 'core/store';
import { AppState } from 'core/store/types';
import connectStore from 'utils/HOCS/connectStore';
import { getChatUsersAction } from 'services/chat/actions';
import { TChatUsersComponentProps } from './types';

class ChatUsersClass extends Block<TChatUsersComponentProps> {
  static componentName = 'ChatUsers';

  componentDidMount(): void {
    const { chatId } = this.props;
    store.dispatch(getChatUsersAction, { chatId });
  }

  protected render(): string {
    return `
    <div>
      {{#if loading }}
      {{{ Loader }}}
      {{/if}}
      {{#if error }}
        {{{ ErrorComponent
            error=error
            ref="error"
        }}}
      {{/if}}
      {{#each chatUsers }}
      {{#with this}}
          <div class="chat_user">
            {{#if this.avatar }}
              <div class="chat_user_avatar">
                {{{ Avatar source=this.avatar width="50" height="50" }}}
              </div>
            {{else}}
              {{{ EmptyAvatar width="50" height="50" }}}
            {{/if}}
            <div class="chat_user_name">
            {{#if this.display_name }} {{this.display_name}} {{else}} Нет ника {{/if}} ||
            </div>
            <div class="chat_user_role">  {{this.role}}</div>
          </div>
        {{/with}}
      {{/each}}
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => ({
  loading: state.chatUsers.loading,
  error: state.chatUsers.error,
  chatUsers: state.chatUsers.data,
});

export const ChatUsers = connectStore(mapStateToProps)(ChatUsersClass);
