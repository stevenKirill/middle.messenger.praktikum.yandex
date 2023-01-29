export interface InviteModalProps {
  isShow: boolean;
  onSearch?: () => void;
  onCloseModal?: () => void;
  error: boolean;
  currentChatId: string;
}
