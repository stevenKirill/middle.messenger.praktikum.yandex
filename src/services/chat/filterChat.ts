import { TGetChatResponse } from 'api/chat/types';

export const filterChatsHelper = (
  match: string,
  data: TGetChatResponse[],
) => {
  const filtered = data.filter((chat) => chat.title.toLowerCase().includes(match));
  return filtered;
};
