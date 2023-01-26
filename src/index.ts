// core
import { registerComponent } from 'core';
import { store } from 'core/store';
import { initRouter } from 'core/router/init';
import appRouter from 'core/router';
import { initApp } from 'services/login';

// styles
import './styles/styles.css';

// components
import Button from 'components/Button';
import Link from 'components/Link';
import Input from 'components/Input';
import Row from 'components/Row';
import Avatar from 'components/Avatar';
import Modal from 'components/Modal';
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
import ChatUser from 'components/ChatItem';
import ChatMessage from 'components/ChatMessage';
import SearchInput from 'components/SearchInput';
import ErrorComponent from 'components/ErrorComponent';
import FileInput from 'components/FileInput';
import EmptyAvatar from 'components/EmptyAvatar';
import CloseButton from 'components/CloseButton';

// components
registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Row);
registerComponent(Avatar);
registerComponent(Modal);
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
registerComponent(FileInput);
registerComponent(EmptyAvatar);
registerComponent(CloseButton);

document.addEventListener('DOMContentLoaded', () => {
  initRouter(appRouter, store);
  store.dispatch(initApp);
});
