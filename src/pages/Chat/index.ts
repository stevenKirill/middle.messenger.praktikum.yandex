import Block from 'core/block/Block';
import withRouter from 'utils/HOCS/withRouter';
import { CoreRouter } from 'core/router/types';
import './chat.css';

type ChatPageProps = {
  router: CoreRouter;
  onClick?: (e: Event) => void;
};

class ChatPage extends Block<ChatPageProps> {
  static componentName: 'ChatPage';

  constructor(props: ChatPageProps) {
    super(props);

    this.setProps({
      ...this.props,
      onClick: (e: Event) => this.handleGoToProfilePage(e),
    });
  }

  handleGoToProfilePage(e: Event) {
    e.preventDefault();
    this.props.router.go('/profile');
  }

  protected render(): string {
    return `
    <div>
    <main class="chat_page">
      <section class="chat_page_left">
        <div class="chat_page_left_profile">
          {{{ Link
              url="#"
              text="Профиль >"
              className="chat_page_left_profile_link"
              onClick=onClick
          }}}
        </div>
        {{{ SearchInput }}}
        <div class="chat_page_left_chats">
          {{{ ChatUser }}}
        </div>
      </section>
      <section class="chat_page_right">
        {{#if isEmpty}}
          {{{ EmptyChat }}}
          {{else}}
          {{{ ChatArea }}}
        {{/if}}
      </section>
      </main>
    </div>
    `;
  }
}

// @ts-ignore FIX
export default withRouter(ChatPage);
