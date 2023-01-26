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
    data: [],
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
    error: true,
    errorReason: 'User is not authorized',
  }
};

export default initialState;
