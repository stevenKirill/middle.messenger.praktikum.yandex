export type ChangeAvatarProps = {
  currentChatId: string;
  isShowModal: boolean;
  onCloseModal?: () => void;
  onSend?: () => void;
  file: File | null,
  fileName: string;
};
