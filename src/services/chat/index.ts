import chatApi from 'api/chat';
import { TCreateChatRequest, TDeleteChatRequest, TGetChatRequest } from 'api/chat/types';
import { APIError } from 'api/types';
import { AppState, Dispatch } from 'core/store/types';
import initSocketListeners from './utils';
import { TSocketData } from './types';

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
    await chatApi.create(requestData);
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
    await chatApi.deleteChat(requestData);
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

export const selectChat = (
  dispatch: Dispatch<AppState>,
  state: AppState,
  chatId: number,
) => {
  dispatch({
    chats: { ...state.chats, currentChat: chatId },
  });
};
