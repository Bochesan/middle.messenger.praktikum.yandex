import EventBus from '../tools/EventBus';
import {cloneDeep} from '../utils/cloneDeep.ts';

export enum StoreEvents {
  Updated = 'Updated'
}

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
    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  public reset() {
    this.state = cloneDeep(initialState as State);
  }
}

export const initialState: Record<string, any> = {
  user: {
    id: null,
    first_name: null,
    second_name: null,
    display_name: null,
    login: null,
    avatar: null,
    email: null,
    phone: null
  },
  chats: null,
  chat: {
    id: null
  },
  chatUsers: null,
  modal: null,
  token: null,
  messages: null,
  socket: null,
};

const state: Record<string, any> = cloneDeep(initialState);

export const store = new Store(state);
