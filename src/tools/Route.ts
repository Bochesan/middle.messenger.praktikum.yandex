import Block from './Block.ts';
import renderDOM from './RenderDOM.ts';
import { TProps } from '../types';
import {store} from '../store';
import router from '../router';
import {ROUTE} from '../utils/Enums.ts';

class Route {
  private _pathname: string;

  private readonly _blockClass: typeof Block;

  private _block: Block | null = null;

  private readonly _props: TProps;

  constructor(pathname: string, view: typeof Block, props: TProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    const {user} = store.getState();
    if (user.id) {
      switch (location.pathname) {
        case ROUTE.Auth:
        case ROUTE.Register:
          return router.go(ROUTE.Chat);
      }
    }

    if (pathname === this._pathname) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      const rootQuery = this._props.rootQuery as string;
      renderDOM(rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
