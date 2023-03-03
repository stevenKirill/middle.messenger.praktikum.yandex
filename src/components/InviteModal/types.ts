export interface InviteModalProps {
  isShow: boolean;
  onSearch?: () => void;
  onCloseModal?: () => void;
  onInput?: () => void;
  currentChatId: string;
}
