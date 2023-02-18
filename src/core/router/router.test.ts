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

  it('Should call start function', () => {
    router.start();
    expect(Router.isStarted).to.equal(true);
  });

  context('adding routes', () => {
    it('Should have router length 1', () => {
      router.use('test', () => {});
      const keys = Object.keys(router.routes);
      expect(keys).to.have.length(1);
    });

    it('Should have router object length 2', () => {
      router.use('test', () => {});
      router.use('main', () => {});
      const keys = Object.keys(router.routes);
      expect(keys).to.have.length(2);
    });
  });
  // TODO fix router test case
  // it('Test router go', () => {
  //   console.log(window.location.pathname, 'r');
  //   router.use('main', () => {});
  //   router.go('/main');
  //   expect(window.location.pathname).to.equal('/main');
  // });
});
