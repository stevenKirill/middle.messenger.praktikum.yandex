// import { isEqual } from '../../utils/isEqual';
// import { render } from '../../utils/renderDOM';

interface IRoute {
  _pathname: string;
  _view?: unknown;
  _props?: unknown;
}

class Route implements IRoute {
  public _pathname: string;

  public _blockClass: unknown;

  public _block: null;

  public _props: any;

  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
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
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
