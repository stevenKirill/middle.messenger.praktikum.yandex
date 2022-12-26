import Block from '../../core/Block';

import './chat.css';

interface ChatPageProps {
}

// stylesheets:
// - ../../styles/styles.css
// isEmpty: true

export class ChatPage extends Block {
  constructor({}: ChatPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< chatContainer}}
    <main class="chat_page">
        <section class="chat_page_left">
          <div class="chat_page_left_profile">
            <a class="chat_page_left_profile_link">
              <span>Профиль</span>
              <i class="chat_page_left_profile_link_arrow"></i>
            </a>
          </div>
          <label class="chat_page_left_profile_input" htmlFor="search_input">
            <input name="search_input" aria-label="search" value=""  placeholder="Поиск"/>
            <img
              id="magnifier"
              src="../../assets/loop.png"
              alt="magnifier"
            />
          </label>
          <div class="chat_page_left_chats">
            <div class="chat_page_left_chats_item"></div>
            <div class="chat_page_left_chats_item"></div>
          </div>
        </section>
        <section class="chat_page_right">
          {{#if isEmpty}}
            <div class="chat_page_right_empty">
              <div class="chat_page_right_empty_message">
                Выберите чат чтобы отправить сообщение
              </div>
            </div>
            {{else}}
            <div class="chat_page_right_chatArea">
              <div class="chat_page_right_chatArea_header"> header</div>
              <div class="chat_page_right_chatArea_messages">messages</div>
              <div class="chat_page_right_chatArea_send">
                send area
              </div>
            </div>
          {{/if}}
        </section>
    </main>
    `
  }
}
