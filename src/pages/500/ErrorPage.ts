import Block from '../../core/Block';

import './error.css';

interface ErrorPageProps {
}

// ---
// stylesheets:
// - ../../styles/styles.css
// ---

export class ErrorPage extends Block {
  constructor({}: ErrorPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< container}}
    <main class="page_500">
      <div class="fiveHundred_container">
        <h1 class="fiveHundred_container_title">500</h1>
        <h2 class="fiveHundred_container_text">Мы уже фиксим</h2>
        <a href="../Chat/Chat.hbs" class="fiveHundred_container_link">Назад к чатам</a>
      </div>
    </main>
    `
  }
}
