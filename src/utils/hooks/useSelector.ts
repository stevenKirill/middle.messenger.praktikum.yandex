import { store } from 'core/store';
import { AppState } from 'core/store/types';

export const useSelector = <T>(selectorFn: (store: AppState) => T) => selectorFn(store.getState());
