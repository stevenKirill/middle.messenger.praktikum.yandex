import chatApi from 'api/chat';
import { TCreateChatRequest, TDeleteChatRequest, TGetChatRequest } from 'api/chat/types';
import { APIError } from 'api/types';
import { AppState, Dispatch } from 'core/store/types';
import socketApi from 'api/socket';
import { TStartChatsResponse } from 'api/socket/types';
import { TUserByIdResponse } from 'api/user/types';
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

export const loadMessages = (
  _dispatch: Dispatch<AppState>,
  _state: AppState,
  { chatId, offset = 0 }: TLoadMessagePayload,
) => {
  const currentSocket = sockets[chatId];
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
      dispatch(loadMessages, { chatId });
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

export const getChatUsersAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  { chatId }: { chatId: number },
) => {
  dispatch({
    chatUsers: {
      ...state.chatUsers,
      loading: true,
    },
  });
  try {
    const chatUsersResponse = await chatApi.getChatUsers(String(chatId));
    dispatch({
      chatUsers: {
        ...state.chatUsers,
        data: chatUsersResponse as TUserByIdResponse[],
        loading: false,
      },
    });
  } catch (error) {
    dispatch({
      chatUsers: {
        ...state.chatUsers,
        loading: false,
        error: true,
      },
    });
  }
};
