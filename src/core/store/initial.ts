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
    currentChat: null,
  },
  createChat: {
    error: false,
    loading: false,
    errorReason: '',
  },
  deleteChat: {
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
  },
  searchUser: {
    data: null,
    error: false,
    loading: false,
    errorReason: '',
  },
  messages: [],
};

export default initialState;
// content=this.content
// type=this.type
// id=this.id
// user_id=this.ser_id
// time=this.time

// {
//   content: 'hello',
//   type: 'type',
//   id: 123,
//   user: 'user',
//   time: '12.02.2021',
// },
// {
//   content: 'hello',
//   type: 'type',
//   id: 123,
//   user: 'user',
//   time: '12.02.2021',
// },
// {
//   content: 'hello',
//   type: 'type',
//   id: 123,
//   user: 'user',
//   time: '12.02.2021',
// }
