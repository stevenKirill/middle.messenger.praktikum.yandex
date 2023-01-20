import { APP_ROUTES, Screens, getScreenComponent } from './constants';
import renderDOM from '../block/renderDOM';
import Store from '../store';
import Router from './index';
import { AppState } from 'store/types';

export function initRouter(router: typeof Router, store: Store<AppState>) {
  APP_ROUTES.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user.data);
      const currentScreen = Boolean(store.getState().app.screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ app: { screen: route.block } });
        return;
      }
      console.log(currentScreen ,'=> currentScreen')
      if (!currentScreen) {
        store.dispatch({ app: { screen: Screens.Login } });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.app.appIsInited && nextState.app.appIsInited) {
      router.start();
    }

    if (prevState.app.screen !== nextState.app.screen) {
      const Page = getScreenComponent(nextState.app.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
