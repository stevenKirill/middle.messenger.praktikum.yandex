import chatApi from 'api/chat';
import { TCreateChatRequest, TDeleteChatRequest, TGetChatRequest } from 'api/chat/types';
import { APIError } from 'api/types';
import { AppState, Dispatch } from 'core/store/types';
import socketApi from 'api/socket';
import { TStartChatsResponse } from 'api/socket/types';
import { TChatIdData, TLoadMessagePayload, TSendMessagePayload } from './types';
import WSTransport from './socket';

export const sockets: Record<string, WSTransport> = {};

export const getChatsAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  requestData?: TGetChatRequest,
) => {
  dispatch({ chats: { ...state.chats, loading: true } });
  try {
    const chatsResponse = await chatApi.getChats(requestData);
    dispatch({
      chats: {
        ...state.chats,
        data: chatsResponse,
        currentChat: null,
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
  dispatch({ createChat: { ...state.createChat, loading: true } });
  try {
    await chatApi.create(requestData);
    dispatch(getChatsAction);
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
  dispatch({ deleteChat: { ...state.createChat, loading: true } });
  try {
    await chatApi.deleteChat(requestData);
    dispatch(getChatsAction);
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

export const loadMessage = (
  _dispatch: Dispatch<AppState>,
  _state: AppState,
  { chatId, offset = 0 }: TLoadMessagePayload,
) => {
  const currentSocket = sockets[chatId];
  console.log(currentSocket);
  if (!currentSocket) {
    return;
  }
  currentSocket.send({ type: 'get old', content: `${offset}` });
};

export const createSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  data: TChatIdData,
) => {
  try {
    const { chatId } = data;
    const chatTokenResponse = await socketApi.getToken(chatId);
    if (!chatTokenResponse) {
      return;
    }
    const successResponse = chatTokenResponse as TStartChatsResponse;
    const userId = state.user.data?.id as number;
    const wsInstance = await socketApi.getSocket(
      {
        chatId,
        userId,
        token: successResponse.token,
      },
    );
    wsInstance.connect();
    wsInstance.on('connected', () => {
      dispatch(loadMessage, { chatId });
    });
    sockets[chatId] = wsInstance;
  } catch (error) {
    const errorChatToken = error as APIError;
    console.error(errorChatToken);
  }
};

export const selectChat = (
  dispatch: Dispatch<AppState>,
  state: AppState,
  chatId: number,
) => {
  dispatch({ chats: { ...state.chats, currentChat: chatId } });
  dispatch(createSocket, { chatId });
};

export const sendMessage = (
  _dispatch: Dispatch<AppState>,
  _state: AppState,
  { chatId, messageText }: TSendMessagePayload,
) => {
  const currentSocket = sockets[chatId];
  if (!currentSocket) {
    return;
  }
  currentSocket.send({ type: 'message', content: messageText });
};
