import { APIError } from 'api/types';
import { appHTTP } from 'utils/http';
import { TStartChatsResponse } from './types';

const socketApi = {
  getToken: (id: number): Promise<TStartChatsResponse | APIError> => appHTTP.post(`chats/token/${id}`),

  // getWS: ({ userId, chatId, token }: TWSRequest) =>
  //   new WSTransport(`${process.env.WSS_ENDPOINT}/chats/${userId}/${chatId}/${token}`),
};
