export interface CreateChatModalProps {
  isShow: boolean;
  onCreate?: () => void;
  onCloseModal?: () => void;
  error: string;
}
