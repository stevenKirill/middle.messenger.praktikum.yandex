import userApi from 'api/user';
import {
  TChangeAvatarRequest,
  TChangePasswordRequest,
  TChangeProfileRequest,
} from 'api/user/types';
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
    const changeUserDataResposne = await userApi.changeProfile(data);
    console.log(changeUserDataResposne, '=> ответ изменения данных');
    if ('reason' in changeUserDataResposne) {
      dispatch({
        user: {
          ...state.user,
          error: true,
          errorReason: changeUserDataResposne.reason,
        },
      });
      return;
    }
    dispatch({
      user: {
        ...state.user,
        data: changeUserDataResposne,
      },
    });
  } catch (error) {
    console.error(error);
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
    const changeUserAvatarResponse = await userApi.changeAvatar(data);
    console.log(changeUserAvatarResponse, '=> ответ изменения аватара');
    if ('reason' in changeUserAvatarResponse) {
      dispatch({
        user: {
          ...state.user,
          error: true,
          errorReason: changeUserAvatarResponse.reason,
        },
      });
      return;
    }
    dispatch({
      user: {
        ...state.user,
        data: changeUserAvatarResponse,
      },
    });
  } catch (error) {
    console.error(error);
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
    const changePasswordResponse = await userApi.changePassword(data);
    if ('reason' in changePasswordResponse) {
      dispatch({
        user: {
          ...state.user,
          error: true,
          errorReason: changePasswordResponse.reason,
        },
      });
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
