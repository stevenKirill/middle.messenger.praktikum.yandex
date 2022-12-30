import Block from 'core/Block';
import './chat.css';

class ChatPage extends Block {
  static componentName: 'ChatPage';

  protected render(): string {
    return `
    <div>
    <main class="chat_page">
      <section class="chat_page_left">
        <div class="chat_page_left_profile">
          {{{ Link url="#" text="Профиль >" className="chat_page_left_profile_link" }}}
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

export default ChatPage;
