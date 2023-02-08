import { TUserByIdResponse } from 'api/user/types';

export type TChatUsersComponentProps = {
  loading?: boolean;
  error?: boolean;
  chatUsers?: TUserByIdResponse[];
  chatId?: number;
};
