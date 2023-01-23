import userApi from 'api/user';
import { TChangeProfileRequest } from 'api/user/types';
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

export const one = 1;
