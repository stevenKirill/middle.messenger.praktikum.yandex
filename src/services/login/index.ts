import loginApi from 'api/login';
import {
  LoginRequestData,
  RegistrationRequestData,
  RegistrationResponseData,
} from 'api/login/types';
import { APIError } from 'api/types';
import appRouter from 'core/router';
import { AppState, Dispatch } from 'core/store/types';

export const initApp = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
) => {
  dispatch({
    user: {
      ...state.user,
      loading: true,
    },
  });
  try {
    const response = await loginApi.user();
    if ('reason' in response) {
      dispatch({
        user: {
          ...state.user,
          error: true,
          errorReason: 'Пользователь неавторизован',
        },
      });
      return;
    }
    dispatch({
      user: {
        ...state.user,
        data: response,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({
      app: {
        ...state.app,
        appIsInited: true,
      },
    });
  }
};

export const signUp = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  requestData: RegistrationRequestData,
) => {
  dispatch({
    registration: {
      ...state.registration,
      loading: true,
    },
  });
  const response: RegistrationResponseData | APIError = await loginApi.signUp(requestData);
  if ('reason' in response) {
    dispatch({
      login: {
        ...state.registration,
        error: true,
        errorReason: response.reason,
      },
    });
    return;
  }
  appRouter.go('/login');
};

export const singIn = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  requestData: LoginRequestData,
) => {
  dispatch({
    login: {
      ...state.login,
      loading: true,
    },
  });
  try {
    const response: APIError = await loginApi.login(requestData);
    if ('reason' in response) {
      dispatch({
        login: {
          ...state.login,
          error: true,
          errorReason: response.reason,
        },
      });
      return;
    }
    const userResponse = await loginApi.user();
    if ('reason' in userResponse) {
      dispatch({
        user: {
          ...state.user,
          error: true,
          errorReason: 'Ошибка загрузки данных по пользователю',
        },
      });
      return;
    }
    dispatch({
      user: {
        ...state.user,
        data: userResponse,
      },
    });
    appRouter.go('/chats');
  } catch (error) {
    console.error(error);
  }
};

export const logOutAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
) => {
  dispatch({
    login: {
      ...state.login,
      loading: true,
    },
  });
  await loginApi.logout();
  dispatch({
    login: {
      ...state.login,
      loading: false,
    },
    user: {
      ...state.user,
      data: null,
    },
  });
};
