import { TGetChatResponse } from 'api/chat/types';

export type ChatPageProps = {
  onProfileGo: (e: Event) => void;
  onChatCreate: () => void;
  onChatClick: () => void
  isShow?: boolean;
  chats: TGetChatResponse[];
  currentChat?: string | null;
  currentChatName: string;
};
