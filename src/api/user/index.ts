import { APIError } from 'api/types';
import { appHTTP } from 'utils/http';
import {
  TChangeAvatarRequest,
  TChangePasswordRequest,
  TChangeProfileRequest,
  TChangeProfileResponse,
  TSearchUserRequest,
  TSearchUserResponse,
  TUserByIdResponse,
} from './types';

const userApi = {
  changeProfile: (data: TChangeProfileRequest): Promise<TChangeProfileResponse | APIError> => appHTTP.put('/user/profile', {
    data: JSON.stringify(data),
  }),
  changePassword: (data: TChangePasswordRequest): Promise<APIError> => appHTTP.put('user/password', {
    data: JSON.stringify(data),
  }),
  getUser: (id: number): Promise<TUserByIdResponse | APIError> => appHTTP.get(`/user/${id}`),
  searchUser: (data: TSearchUserRequest): Promise<TSearchUserResponse | APIError> => appHTTP.post('/user/search', {
    data: JSON.stringify(data),
  }),
  changeAvatar: (file: TChangeAvatarRequest): Promise<TChangeProfileResponse | APIError> => appHTTP.put('/user/profile/avatar', {
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default userApi;
