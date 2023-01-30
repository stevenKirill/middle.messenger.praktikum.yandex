import { UserInfoResponse } from 'api/login/types';

export interface EditUserPageProps {
  onDataChange: (e: Event) => void,
  onChange: (e:Event) => void;
  onAvatarChange?: () => void,
  onOpen: () => void,
  onInput: (e: Event) => void,
  error: {
    [key: string]: string,
  },
  avatar: string,
  file: File | null,
  userData: UserInfoResponse,
  changeDataError: boolean,
  changeDataErrorReason: string,
  loading: boolean,
}
