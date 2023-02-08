import { TGetChatResponse } from 'api/chat/types';
import { useSelector } from 'utils/hooks/useSelector';
import { TChatMessageItem } from './types';

export const selectChats = <T = TGetChatResponse[]>() => <T>useSelector(
  (state) => state.chats.data,
);

export const selectCurrentChat = <T = number | null>() => <T>useSelector(
  (state) => state.chats.currentChat,
);

export const selectMessages = <T = TChatMessageItem[]>() => <T>useSelector(
  (state) => state.messages,
);
