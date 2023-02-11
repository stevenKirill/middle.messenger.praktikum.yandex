export interface ChatAreaProps {
  groupedMessages?: [];
  currentChatName?: string;
  currentChatId?: number;
  onDeleteChat?: () => void;
  onInvitePerson?: () => void;
}
