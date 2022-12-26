import { Block, renderDOM, registerComponent }  from './core';

import './styles/styles.css';

// components
import Button from './components/Button';
import Link from './components/Link';
import Input from './components/Input';
import Row from './components/Row';
import Avatar from './components/Avatar';
import AvatarModal from './components/AvatarModal';
import EditRow from './components/EditRow';


// layouts
import ChatContainer from './layouts/ChatContainer';
import { UserContainer } from './layouts/UserContainer';
import Container from './layouts/Container';

// pages
import LoginPage from './pages/Login';

// components
registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Row);
registerComponent(Avatar);
registerComponent(AvatarModal);
registerComponent(EditRow);

// layouts
registerComponent(ChatContainer);
registerComponent(UserContainer);
registerComponent(Container);


// pages
registerComponent(LoginPage);

class MyComponent extends Block {
  constructor() {
      super();
      this.setProps({
          onButtonClick: () => console.log('helldssso'),
          text: 'Lol',
      })
  }
  render() {
    return `
    {{!< container}}
    <main class="login">
      <div class="login_header">Вход</div>
      <form>
        <div class="login_inputs">
          {{{ Input name="login" placeholder="Логин" type="text" }}}
          {{{ Input name="password" placeholder="Пароль" type="password" }}}
        </div>
        {{{ Button }}}
      </form>
      {{{ Link url="" class="login_link" text="Нет аккаунта" }}}
    </main>
    `
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new MyComponent());
});


// <!DOCTYPE html>
// <html lang="ru">
//   <head>
//     <title>Web messenger</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     {{#block "styles"}}
//       {{#each stylesheets}}
//       <link href="{{this}}" rel="stylesheet" />
//       {{/each}}
//     {{/block}}
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
//   </head>
//   <body>
//     <div class="root">
//       {{{body}}}
//     </div>
//   </body>
// </html>
