import { Screens } from '../core/router/constants';

export type TApp = {
  screen: Screens | null;
  appIsInited: boolean;
};

export type TUser = {
  data: any;
  error: boolean;
  loading: boolean;
  errorReason?: string;
};

export type TChats = {
  data: any;
  error: boolean;
  loading: boolean;
  errorReason?: string;
};

export type AppState = {
  app: TApp;
  user: TUser;
  chats: TChats;
};
