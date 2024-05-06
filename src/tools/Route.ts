import Block from './Block.ts';
import renderDOM from './RenderDOM.ts';
import { TProps } from '../types';

class Route {
  public _pathname: string;

  public readonly _blockClass: typeof Block;

  public _block: Block | null = null;

  public readonly _props: TProps;

  constructor(pathname: string, view: typeof Block, props: TProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (pathname === this._pathname) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.componentWillUnmount();
      this._block = null;
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
  }
}

export default Route;
