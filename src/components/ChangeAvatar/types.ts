export type ChangeAvatarProps = {
  currentChatId: string;
  isShowModal: boolean;
  onInput?: (e: Event) => void;
  onUpload?: () => void;
  onCloseModal?: () => void;
};
