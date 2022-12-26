import Block from '../../core/Block';
import './error.css';

interface ErrorPageProps {
}

class ErrorPage extends Block {
  constructor({}: ErrorPageProps) {
    super({ });
  }

  protected render(): string {
    return `
    <div class="root">
      <main class="page_500">
      <div class="fiveHundred_container">
        <h1 class="fiveHundred_container_title">500</h1>
        <h2 class="fiveHundred_container_text">Мы уже фиксим</h2>
        {{{ Link
            className="fiveHundred_container"
            url="#"
            text="Назад к чатам"
        }}}
      </div>
      </main>
    </div>
    `
  }
}

export default ErrorPage;
