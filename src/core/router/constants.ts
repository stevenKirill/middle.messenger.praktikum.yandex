import EnhancedLoginPage from 'pages/LoginPage';
import EnhancedRegistartion from 'pages/RegistrationPage';
import EnhancedUserPage from 'pages/UserPage';
import EnhancedEditUserPage from 'pages/EditUserPage';
import EditPassword from 'pages/EditPassword';
import Chat from 'pages/Chat';
import { BlockClass } from '../types';

export enum Screens  {
  Login = 'login',
  Registartion = 'registration',
  Profile = 'profile',
  EditInfo = 'edit-info',
  EditPassword = 'edit-password',
  Chats = 'chats',
};

export const APP_ROUTES = [
  {
    path: '/login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/registration',
    block: Screens.Registartion,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/edit/info',
    block: Screens.EditInfo,
    shouldAuthorized: true,
  },
  {
    path: '/edit/password',
    block: Screens.EditPassword,
    shouldAuthorized: true,
  },
  {
    path: '/chats',
    block: Screens.Chats,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Login,
    shouldAuthorized: false,
  },
];

export const routesMap: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: EnhancedLoginPage,
  [Screens.Registartion]: EnhancedRegistartion,
  [Screens.Profile]: EnhancedUserPage,
  [Screens.EditInfo]: EnhancedEditUserPage,
  [Screens.EditPassword]: EditPassword,
  [Screens.Chats]: Chat,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return routesMap[screen];
};
