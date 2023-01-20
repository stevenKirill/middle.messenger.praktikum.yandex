import { AppState } from './types';

const initialState: AppState = {
  app: {
    screen: null,
    appIsInited: false,
  },
  user: {
    data: {},
    error: false,
    loading: false,
  },
  chats: {
    data: {},
    error: false,
    loading: false,
  },
};

export default initialState;
