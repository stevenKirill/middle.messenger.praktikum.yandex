export type TChangeProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TChangeAvatarRequest = {
  file: File;
};

export type TChangeProfileResponse = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  avatar: string;
  phone: string;
  id: number;
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TUserByIdResponse = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  avatar: string;
  phone: string;
  id: number;
};

export type TSearchUserRequest = {
  login: string;
};

export type TSearchUserResponse = TUserByIdResponse[];
