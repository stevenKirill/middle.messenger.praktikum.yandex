/* eslint-disable @typescript-eslint/no-explicit-any */
import initialState from './initial';
import EventBus from '../EventBus';
import { Action, AppState } from './types';

class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit('changed', prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}

export const store = new Store<AppState>(initialState);

export default Store;
