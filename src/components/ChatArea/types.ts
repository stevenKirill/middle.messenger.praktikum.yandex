export interface ChatAreaProps {
  messages: [];
  currentChatName: string;
  currentChatId: number;
  onDeleteChat?: () => void;
  onInvitePerson?: () => void;
  renderMessages: () => void;
}
