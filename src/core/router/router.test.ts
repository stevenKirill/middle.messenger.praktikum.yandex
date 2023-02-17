import { expect } from 'chai';
import { Router } from './index';

let router: Router;

export const APP_ROUTES = [
  {
    path: '/login',
    block: 'login',
    shouldAuthorized: false,
  },
  {
    path: '/registration',
    block: 'registration',
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: 'profile',
    shouldAuthorized: true,
  },
  {
    path: '/edit/info',
    block: 'edit-info',
    shouldAuthorized: true,
  },
  {
    path: '/edit/password',
    block: 'edit-password',
    shouldAuthorized: true,
  },
  {
    path: '/chats',
    block: 'chats',
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: 'login',
    shouldAuthorized: false,
  },
  {
    path: '/error',
    block: 'error',
    shouldAuthorized: false,
  },
  {
    path: '/not-found',
    block: 'not-found',
    shouldAuthorized: false,
  },
];

describe('Roter tests', () => {
  beforeEach(() => {
    router = new Router();
  });

  it('Call start function', () => {
    router.start();
    expect(Router.isStarted).to.equal(true);
  });

  context('adding routes', () => {
    it('Test add route', () => {
      router.use('test', () => {});
      const keys = Object.keys(router.routes);
      expect(keys).to.have.length(1);
    });

    it('Test router object has length 2', () => {
      router.use('test', () => {});
      router.use('main', () => {});
      const keys = Object.keys(router.routes);
      expect(keys).to.have.length(2);
    });
  });
  // TODO Fix test
  // it('Test router object has length 2', () => {
  //   router.use('test', () => {});
  //   router.use('main', () => {});
  //   router.go('/main');
  //   const mainRouteCallback = router.routes.main;
  //   expect(mainRouteCallback).toHaveBeenCalled()
  // });
});
