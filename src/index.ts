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
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import BackLink from './components/BackLink';


// layouts
import ChatContainer from './layouts/ChatContainer';
import { UserContainer } from './layouts/UserContainer';
import Container from './layouts/Container';

// pages
import LoginPage from './pages/Login';;
import RegistrationPage from './pages/Registration';
import EditUserPage from './pages/EditUser';
import { UserPage } from './pages/User/User';
import EditPasswordPage  from './pages/EditPassword';

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

// layouts
registerComponent(ChatContainer);
registerComponent(UserContainer);
registerComponent(Container);


// pages
registerComponent(LoginPage);
registerComponent(RegistrationPage);
registerComponent(EditUserPage);
registerComponent(UserPage);
registerComponent(EditPasswordPage);

class MyComponent extends EditPasswordPage {
  constructor() {
      super();
  }
  renderContent() {
    return this.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new MyComponent());
});
