import chatApi from 'api/chat';
import { TCreateChatRequest, TDeleteChatRequest, TGetChatRequest } from 'api/chat/types';
import { APIError } from 'api/types';
import { AppState, Dispatch } from 'core/store/types';

export const getChatsAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  requestData?: TGetChatRequest,
) => {
  dispatch({
    chats: {
      ...state.chats,
      loading: true,
    },
  });
  try {
    const chatsResponse = await chatApi.getChats(requestData);
    console.log(chatsResponse, '=> chatsResponse');
    dispatch({
      chats: {
        ...state.chats,
        data: chatsResponse,
      },
    });
  } catch (error) {
    const errorResponse = error as APIError;
    dispatch({
      chats: {
        ...state.chats,
        error: true,
        errorReason: errorResponse.reason,
      },
    });
  }
};

export const createChatAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  requestData: TCreateChatRequest,
) => {
  dispatch({
    createChat: {
      ...state.createChat,
      loading: true,
    },
  });
  try {
    const createChatResponse = await chatApi.create(requestData);
    console.log(createChatResponse, '=> create chat response');
  } catch (error) {
    const errorResponse = error as APIError;
    dispatch({
      createChat: {
        ...state.createChat,
        error: true,
        errorReason: errorResponse.reason,
      },
    });
  }
};

export const deleteChatAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  requestData: TDeleteChatRequest,
) => {
  dispatch({
    deleteChat: {
      ...state.createChat,
      loading: true,
    },
  });
  try {
    const deleteChatResponse = await chatApi.deleteChat(requestData);
    console.log(deleteChatResponse, '=> delete chat response');
  } catch (error) {
    const errorResponse = error as APIError;
    dispatch({
      deleteChat: {
        ...state.createChat,
        error: true,
        errorReason: errorResponse.reason,
      },
    });
  }
};

type TSocketData = {
  chatId: string;
  token: string;
};

const initSocketListeners = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    socket.send(JSON.stringify({
      content: 'Моё первое сообщение миру!',
      type: 'message',
    }));
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    console.log('Получены данные', event.data);
  });

  socket.addEventListener('error', (event) => {
    console.log('Ошибка', event.message);
  });
};

export const createSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  data: TSocketData,
) => {
  try {
    const { chatId, token } = data;
    const userId = state.user.data?.id;
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    initSocketListeners(socket);
    console.log(socket, '=> socket');
    dispatch({
      sockets: {
        ...state.sockets,
        [chatId]: socket,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
