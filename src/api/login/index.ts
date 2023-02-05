import { appHTTP } from 'utils/http';
import { APIError } from 'api/types';
import {
  LoginRequestData,
  RegistrationRequestData,
  RegistrationResponseData,
  UserInfoResponse,
} from './types';

const loginApi = {
  login: (data: LoginRequestData): Promise<APIError> => appHTTP.post(
    '/auth/signin',
    {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    },
  ),
  signUp: (
    data: RegistrationRequestData,
  ): Promise<RegistrationResponseData | APIError> => appHTTP.post(
    '/auth/signup',
    {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    },
  ),
  logout: () => appHTTP.post('/auth/logout'),
  user: (): Promise<UserInfoResponse | APIError> => appHTTP.get(
    '/auth/user',
    {
      headers: { 'Content-Type': 'application/json' },
    },
  ),
};

export default loginApi;
