import { TGetChatResponse } from "api/chat/types";
import { UserInfoResponse } from "api/login/types";
import { TUserByIdResponse } from "api/user/types";
import { Screens } from "core/router/constants";
import { TChatMessageItem } from "services/chat/types";

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
  data: TGetChatResponse[];
  error: boolean;
  loading: boolean;
  errorReason?: string;
  currentChat: number | null;
};

export type TCreateChat = {
  error: boolean;
  loading: boolean;
  errorReason?: string;
}

export type TDeleteChat = {
  error: boolean;
  loading: boolean;
  errorReason?: string;
}

export type TSearchUserState = {
  error: boolean;
  loading: boolean;
  errorReason?: string;
  data: UserInfoResponse[] | null;
}

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

export type AppState = {
  app: TApp;
  user: TUser;
  chats: TChats;
  registration: TRegistartionState;
  login: TLoginState;
  createChat: TCreateChat;
  deleteChat: TDeleteChat;
  searchUser: TSearchUserState;
  messages: {
    [key: string]: TChatMessageItem[],
  };
  chatUsers: TChatUsers;
};


export type TChatUsers = {
  loading: boolean;
  data: TUserByIdResponse[],
  error: boolean;
}
