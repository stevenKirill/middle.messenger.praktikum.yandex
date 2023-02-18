import { expect } from 'chai';
import Store from './index';
import initialState from './initial';

describe('Store tests', () => {
  const store = new Store(initialState);

  it('should be equal to initial state', () => {
    expect(store.getState()).to.deep.equal(initialState);
  });

  it('should change app state to app inited', () => {
    store.dispatch({
      app: {
        ...store.getState().app,
        appIsInited: true,
      },
    });
    expect(store.getState().app.appIsInited).to.equal(true);
  });

  it('should save error when login', () => {
    store.dispatch({
      login: {
        ...store.getState().login,
        error: true,
        errorReason: 'Ошибка входа в систему',
      },
    });
    expect(store.getState().login.error).to.equal(true);
    expect(store.getState().login.errorReason).to.equal('Ошибка входа в систему');
  });
});
