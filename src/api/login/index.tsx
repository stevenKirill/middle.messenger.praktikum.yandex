import { appHTTP } from 'utils/http';
import { APIError } from 'api/types';
import {
  LoginRequestData,
  RegistrationRequestData,
  RegistrationResponseData,
  UserInfoResponse,
} from './types';

const loginApi = {
  login: (data: LoginRequestData) => appHTTP.post('/auth/signin', { data }),
  signUp: (data: RegistrationRequestData): Promise<RegistrationResponseData | APIError> => {
    console.log('req');
    return appHTTP.post('/auth/signup', { data });
  },
  logout: () => appHTTP.post('/auth/logout'),
  user: (): Promise<UserInfoResponse | APIError> => appHTTP.get('/auth/user'),
};

export default loginApi;
