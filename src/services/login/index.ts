import loginApi from 'api/login';
import {
  LoginRequestData,
  RegistrationRequestData,
  UserInfoResponse,
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
    const response = await loginApi.user() as UserInfoResponse;
    dispatch({
      user: {
        ...state.user,
        data: response,
      },
    });
  } catch (error) {
    console.error(error);
    dispatch({
      user: {
        ...state.user,
        error: true,
        errorReason: 'Пользователь неавторизован',
      },
    });
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
  try {
    await loginApi.signUp(requestData);
    appRouter.go('/login');
  } catch (error) {
    const errorResponse = error as APIError;
    dispatch({
      login: {
        ...state.registration,
        error: true,
        errorReason: errorResponse.reason,
      },
    });
  }
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
    await loginApi.login(requestData);
    const userResponse = await loginApi.user() as UserInfoResponse;
    dispatch({
      user: {
        ...state.user,
        data: userResponse,
      },
    });
    appRouter.go('/chats');
  } catch (error) {
    const responseError = error as APIError;
    dispatch({
      login: {
        ...state.login,
        error: true,
        errorReason: responseError.reason,
      },
    });
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
  try {
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
    appRouter.go('/login');
  } catch (error) {
    console.error(error);
  }
};
