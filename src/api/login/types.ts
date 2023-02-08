export type LoginRequestData = {
  login: string;
  password: string;
};

export type RegistrationRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type RegistrationResponseData = {
  id: number;
};

export type UserInfoResponse = {
  avatar: string | null;
  display_name: string | null;
  email: string | null;
  first_name: string | null;
  id: number;
  login: string | null;
  phone: string | null;
  second_name: string | null;
};
