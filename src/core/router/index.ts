import { CoreRouter } from './types';

export class Router implements CoreRouter {
  private routes: Record<string, Function> = {};

  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;

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
    const found = Object.entries(this.routes).find(([routeHash]) => {
      return routeHash === pathname;
    });
    console.log(found, '=> found route');
    if (found) {
      const [,callback] = found;
      callback();
    }

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }
}
