import loginApi from 'api/login';
import { RegistrationRequestData } from 'api/login/types';
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
    console.log(response, '=> response user');
    if (response?.reason) {
      dispatch({
        user: {
          ...state.user,
          error: true,
          errorReason: response.reason,
        },
      });
      return;
    }
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
  action: RegistrationRequestData,
) => {
  dispatch({
    registration: {
      ...state.registration,
      loading: true,
    },
  });
  const response = await loginApi.signUp(action);

  console.log(response, '=> response');

  if (response?.reason) {
    dispatch({
      registration: {
        ...state.registration,
        error: true,
        errorReason: response.reason,
      },
    });
    return;
  }
  appRouter.go('/login');
};
