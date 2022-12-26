import Block from '../../core/Block';

interface UserContainerProps {
}

export class UserContainer extends Block {
  constructor({ }: UserContainerProps) {
    super();
  }

  protected render(): string {
    return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <title>Web messenger</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        {{#block "styles"}}
          {{#each stylesheets}}
          <link href="{{this}}" rel="stylesheet" />
          {{/each}}
        {{/block}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body>
        <div>
          <main class="user">
          <div class="user_left">
            <a class="user_left_link" href="../index.hbs">
              <i class="user_left_link_arrow"></i>
            </a>
          </div>
          {{{body}}}
          </main>
        </div>
      </body>
    </html>
    `
  }
}
