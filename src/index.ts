// core
import { renderDOM, registerComponent } from 'core';
import Store from 'core/store';
import { initRouter } from 'core/router/init';
import { AppState } from 'store/types';
import appRouter from 'core/router';

// styles
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
import UserPage from 'pages/UserPage';
import EditPasswordPage from 'pages/EditPassword';
import ErrorPage from 'pages/ErrorPage';
import NotFoundPage from 'pages/NotFoundPage';
import ChatPage from 'pages/Chat';
import initialState from './store';

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

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(initialState);
  console.log(store, '=> initial store');

  // renderDOM(new LoginPage({}));

  initRouter(appRouter, store);
  //  /**
  //   * Загружаем данные для приложения
  //   */
  store.dispatch({ app: { appIsInited: true } });
});
