import { APIError } from 'api/types';
import userApi from 'api/user';
import {
  TChangeAvatarRequest,
  TChangePasswordRequest,
  TChangeProfileRequest,
  TChangeProfileResponse,
  TSearchUserRequest,
} from 'api/user/types';
import appRouter from 'core/router';
import { AppState, Dispatch } from 'core/store/types';

export const changeUserDataAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  data: TChangeProfileRequest,
) => {
  dispatch({
    user: {
      ...state.user,
      loading: true,
    },
  });
  try {
    const changeUserDataResposne = await userApi.changeProfile(data) as TChangeProfileResponse;
    dispatch({
      user: {
        ...state.user,
        data: changeUserDataResposne,
      },
    });
    // appRouter.go('/profile');
  } catch (error) {
    const responseError = error as APIError;
    dispatch({
      user: {
        ...state.user,
        error: true,
        errorReason: responseError.reason,
      },
    });
  }
};

export const changeUserAvatarAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  data: TChangeAvatarRequest,
) => {
  dispatch({
    user: {
      ...state.user,
      loading: true,
    },
  });
  try {
    const changeUserAvatarResponse = await userApi.changeAvatar(data) as TChangeProfileResponse;
    dispatch({
      user: {
        ...state.user,
        data: changeUserAvatarResponse,
      },
    });
  } catch (error) {
    const responseError = error as APIError;
    dispatch({
      user: {
        ...state.user,
        error: true,
        errorReason: responseError.reason,
      },
    });
  }
};

export const changeUserPasswordAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  data: TChangePasswordRequest,
) => {
  dispatch({
    user: {
      ...state.user,
      loading: true,
    },
  });
  try {
    await userApi.changePassword(data);
    appRouter.go('/profile');
  } catch (error) {
    const responseError = error as APIError;
    dispatch({
      user: {
        ...state.user,
        error: true,
        errorReason: responseError.reason,
      },
    });
  }
};

export const searchUserByLoginAction = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  data: TSearchUserRequest,
) => {
  dispatch({
    user: {
      ...state.user,
      loading: true,
    },
  });
  try {
    const userResposne = await userApi.searchUser(data);
    console.log(userResposne, '[> userResposne');
  } catch (error) {
    const responseError = error as APIError;
    dispatch({
      user: {
        ...state.user,
        error: true,
        errorReason: responseError.reason,
      },
    });
  }
};
