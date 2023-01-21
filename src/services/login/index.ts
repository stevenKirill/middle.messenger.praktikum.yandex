import loginApi from 'api/login';
import { RegistrationRequestData } from 'api/login/types';
import appRouter from 'core/router';
import { AppState, Dispatch } from 'core/store/types';

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

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  appRouter.go('/login');
};

export const a = 1;
