import { AppState } from './types';

const store: AppState = {
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

export default store;
