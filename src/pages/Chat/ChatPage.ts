import Block from 'core/Block';
import './chat.css';

interface ChatPageProps {
}

export class ChatPage extends Block {
  constructor({}: ChatPageProps) {
    super({ });
  }

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
    `
  }
}
