import Block from '../../core/Block';

interface ContainerProps {
}

export class Container extends Block {
  constructor({ }: ContainerProps) {
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
        <div class="root">
          {{{body}}}
        </div>
      </body>
    </html>
    `
  }
}
