export interface ChatAreaProps {
  messages?: [];
  currentChatName: string;
  currentChatId: string;
  onDeleteChat?: () => void;
  onInvitePerson?: () => void;
  isShow?: boolean;
}
