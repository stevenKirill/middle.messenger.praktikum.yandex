import { APIError } from 'api/types';
import { appHTTP } from 'utils/http';
import { TUserByIdResponse } from 'api/user/types';
import {
  TCreateChatRequest,
  TDeleteChatRequest,
  TDeleteChatResponse,
  TGetChatRequest,
  TGetChatResponse,
  TInviteUserRequest,
} from './types';

const chatApi = {
  create(data: TCreateChatRequest): Promise<APIError> {
    return appHTTP.post('/chats', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  getChats(data?: TGetChatRequest): Promise<TGetChatResponse[]> {
    return appHTTP.get('/chats', { data });
  },
  deleteChat(data: TDeleteChatRequest): Promise<TDeleteChatResponse> {
    return appHTTP.delete('/chats', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  inviteUser(data: TInviteUserRequest): Promise<APIError> {
    return appHTTP.put('/chats/users', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  changeChatAvatar(data: FormData): Promise<TGetChatResponse | APIError> {
    return appHTTP.put('/chats/avatar', { data });
  },
  getChatUsers(id: string): Promise<TUserByIdResponse[] | APIError> {
    return appHTTP.get(`/chats/${id}/users`);
  },
};

export default chatApi;
