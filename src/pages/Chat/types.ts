import { TGetChatResponse } from 'api/chat/types';

export type ChatPageProps = {
  onProfileGo: (e: Event) => void;
  onChatCreate: () => void;
  onChatClick: () => void
  chats: TGetChatResponse[];
  currentChat: string | null;
  currentChatName: string;
};
