import Block from '../../core/Block';

import './error.css';

interface NotFoundPageProps {
}

// ---
// stylesheets:
// - ../../styles/styles.css
// ---

export class NotFoundPage extends Block {
  constructor({}: NotFoundPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    {{!< container}}
    <main class="page_404">
      <div class="fourOfour_container">
        <h1 class="fourOfour_container_title">404</h1>
        <h2 class="fourOfour_container_text">Не туда попали</h2>
        <a href="../Chat/Chat.hbs" class="fourOfour_container_link">Назад к чатам</a>
      </div>
    </main>
    `
  }
}
