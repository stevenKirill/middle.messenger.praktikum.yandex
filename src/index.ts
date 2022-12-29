import { Block, renderDOM, registerComponent } from 'core';

import './styles/styles.css';

// components
import Button from 'components/Button';
import Link from 'components/Link';
import Input from 'components/Input';
import Row from 'components/Row';
import Avatar from 'components/Avatar';
import AvatarModal from 'components/AvatarModal';
import EditRow from 'components/EditRow';
import RegistrationForm from 'components/RegistrationForm';
import LoginForm from 'components/LoginForm';
import BackLink from 'components/BackLink';
import ChatArea from 'components/ChatArea';
import EmptyChat from 'components/EmptyChat';
import ControlledTextArea from 'components/ControlledTextArea';
import TextArea from 'components/TextArea';
import SendButton from 'components/SendButton';
import ClipButton from 'components/ClipButton';
import ChatUser from 'components/ChatUser';
import ChatMessage from 'components/ChatMessage';
import SearchInput from 'components/SearchInput';
import ErrorComponent from 'components/ErrorComponent';

// pages
import LoginPage from 'pages/LoginPage';
import RegistrationPage from 'pages/RegistrationPage';
import EditUserPage from 'pages/EditUserPage';
import UserPage from 'pages/User/User';
import EditPasswordPage from 'pages/EditPassword';
import ErrorPage from 'pages/ErrorPage';
import NotFoundPage from 'pages/NotFoundPage';
import ChatPage from 'pages/Chat';

// components
registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Row);
registerComponent(Avatar);
registerComponent(AvatarModal);
registerComponent(EditRow);
registerComponent(RegistrationForm);
registerComponent(LoginForm);
registerComponent(BackLink);
registerComponent(ChatArea);
registerComponent(EmptyChat);
registerComponent(TextArea);
registerComponent(SendButton);
registerComponent(ClipButton);
registerComponent(ChatUser);
registerComponent(ChatMessage);
registerComponent(SearchInput);
registerComponent(ControlledTextArea);
registerComponent(ErrorComponent);

// pages
registerComponent(LoginPage);
registerComponent(RegistrationPage);
registerComponent(EditUserPage);
registerComponent(UserPage);
registerComponent(EditPasswordPage);
registerComponent(ErrorPage);
registerComponent(NotFoundPage);
registerComponent(ChatPage);

class MyComponent extends Block {
  protected getStateFromProps(props: unknown): void {
    console.log(props);
    this.state = {
      registrationPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/registartion`);
        renderDOM(new RegistrationPage());
      },
      loginPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/login`);
        renderDOM(new LoginPage());
      },
      editUserMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/user/edit`);
        renderDOM(new EditUserPage());
      },
      userPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/user`);
        renderDOM(new UserPage());
      },
      editPasswordMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/edit-password`);
        renderDOM(new EditPasswordPage());
      },
      notFoundMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/not-found`);
        renderDOM(new NotFoundPage());
      },
      errorPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/error`);
        renderDOM(new ErrorPage());
      },
      chatPageMethod(e: Event) {
        e.preventDefault();
        window.history.pushState({}, '', `${window.location.origin}/chat`);
        renderDOM(new ChatPage({}));
      },
    };
  }

  render() {
    return `
    <ul class="app_pages_menu">
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Registartion"
          onClick=registrationPageMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Login"
          onClick=loginPageMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Edit user"
          onClick=editUserMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="User"
          onClick=userPageMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Edit password"
          onClick=editPasswordMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Notfound page"
          onClick=notFoundMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Error page"
          onClick=errorPageMethod
        }}}
      </li>
      <li class="app_pages_menu_item">
        {{{Button
          textBtn="Chat page"
          onClick=chatPageMethod
        }}}
    </ul>
  `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new MyComponent());
});
