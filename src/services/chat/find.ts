import { TGetChatResponse } from 'api/chat/types';

const findCurrentChat = (
  chats: TGetChatResponse[],
  currentChat: number,
): string => {
  const foundChat = chats.find((val) => val.id === currentChat);
  if (foundChat) {
    return foundChat.title;
  }
  return '';
};

export default findCurrentChat;
