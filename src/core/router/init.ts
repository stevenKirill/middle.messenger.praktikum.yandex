import { AppState } from 'core/store/types';
import { APP_ROUTES, Screens, getScreenComponent } from './constants';
import renderDOM from '../block/renderDOM';
import Store from '../store';
import { Router } from './index';

export function initRouter(router: Router, store: Store<AppState>) {
  APP_ROUTES.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user.data);
      const currentScreen = Boolean(store.getState().app.screen);
      if (isAuthorized || !route.shouldAuthorized) {
        if (route.path === '*') {
          router.go('/chats');
          return;
        }
        store.dispatch({
          app: {
            ...store.getState().app,
            screen: route.block,
          },
        });
        return;
      }
      if (!currentScreen) {
        store.dispatch({
          app: {
            ...store.getState().app,
            screen: Screens.Login,
          },
        });
      }
    });
  });

  store.on('changed', (prevState, nextState) => {
    if (!prevState.app.appIsInited && nextState.app.appIsInited) {
      router.start();
    }

    if (prevState.app.screen !== nextState.app.screen) {
      const Page = getScreenComponent(nextState.app.screen);
      renderDOM(new Page({}));
      document.title = 'Chat app';
    }
  });
}
