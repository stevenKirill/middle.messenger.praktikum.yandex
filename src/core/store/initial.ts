import { AppState } from './types';

const initialState: AppState = {
  app: {
    screen: null,
    appIsInited: false,
  },
  user: {
    data: null,
    error: false,
    loading: false,
    errorReason: '',
  },
  chats: {
    data: null,
    error: false,
    loading: false,
    errorReason: '',
  },
  createChat: {
    error: false,
    loading: false,
    errorReason: '',
  },
  registration: {
    loading: false,
    error: false,
    errorReason: '',
  },
  login: {
    loading: false,
    error: false,
    errorReason: '',
  }
};

export default initialState;
