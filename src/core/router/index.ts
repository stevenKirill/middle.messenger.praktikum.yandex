import { CoreRouter } from './types';

export class Router implements CoreRouter {
  routes: Record<string, Function> = {};

  static isStarted = false;

  start() {
    if (!Router.isStarted) {
      Router.isStarted = true;

      window.onpopstate = () => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  use(routeName: string, callback: Function) {
    this.routes[routeName] = callback;
    return this;
  }

  forward() {
    window.history.forward();
  }

  back() {
    window.history.back();
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  onRouteChange(pathname: string = window.location.pathname) {
    const found = Object.entries(this.routes).find(([routeHash]) => routeHash === pathname);

    if (found) {
      const [,callback] = found;
      callback();
    }

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }
}

const appRouter = new Router();
export default appRouter;
