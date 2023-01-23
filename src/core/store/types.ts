import { UserInfoResponse } from "api/login/types";
import { Screens } from "core/router/constants";

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any,
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any,
) => void;

export type TApp = {
  screen: Screens | null;
  appIsInited: boolean;
};

export type TUser = {
  data: UserInfoResponse | null;
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
  registration: TRegistartionState;
  login: TLoginState;
};

export type TRegistartionState = {
  loading: boolean;
  error: boolean;
  errorReason?: string;
};


export type TLoginState = {
  loading: boolean;
  error: boolean;
  errorReason?: string;
};
