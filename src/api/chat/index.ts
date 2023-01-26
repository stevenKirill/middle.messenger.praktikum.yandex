import { APIError } from 'api/types';
import { appHTTP } from 'utils/http';
import {
  TCreateChatRequest,
  TDeleteChatRequest,
  TDeleteChatResponse,
  TGetChatRequest,
  TGetChatResponse,
} from './types';

const chatApi = {
  create(data: TCreateChatRequest): Promise<APIError> {
    return appHTTP.post('/chats', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getChats(data?: TGetChatRequest): Promise<TGetChatResponse[]> {
    return appHTTP.get('/chats', {
      data,
    });
  },
  deleteChat(data: TDeleteChatRequest): Promise<TDeleteChatResponse> {
    return appHTTP.delete('/chats', {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default chatApi;
