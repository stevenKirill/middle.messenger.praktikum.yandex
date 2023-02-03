import Block from 'core/block/Block';

class NotFoundPage extends Block {
  static componentName: 'NotFoundPage';

  protected render(): string {
    return `
    <div class="root">
      <main class="page_404">
      <div class="fourOfour_container">
        <h1 class="fourOfour_container_title">404</h1>
        <h2 class="fourOfour_container_text">Не туда попали</h2>
        {{{ Link
            className="fourOfour_container_link"
            url="#"
            text="Назад к чатам"
        }}}
      </div>
      </main>
    </div>
    `;
  }
}

export default NotFoundPage;
