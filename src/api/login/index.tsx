import { appHTTP } from 'utils/http';
import { APIError } from 'api/types';
import { LoginRequestData, RegistrationRequestData, RegistrationResponseData } from './types';

const loginApi = {
  login: (data: LoginRequestData) => appHTTP.post('/auth/signin', { data }),
  signUp: (data: RegistrationRequestData) => appHTTP.post<RegistrationResponseData | APIError>('/auth/signup', { data }),
  logout: () => appHTTP.post('/auth/logout'),
};

export default loginApi;
