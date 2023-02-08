import { APIError } from 'api/types';
import { appHTTP } from 'utils/http';
import WSTransport from 'services/chat/socket';
import { BASE_URL_WS } from 'utils/http/constants';
import { TSocketRequest, TStartChatsResponse } from './types';

const socketApi = {
  getToken: (id: number): Promise<TStartChatsResponse | APIError> => appHTTP.post(`/chats/token/${id}`),
  getSocket: ({ userId, chatId, token }: TSocketRequest) => new WSTransport(`${BASE_URL_WS}/${userId}/${chatId}/${token}`),
};

export default socketApi;
