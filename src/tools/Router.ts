import Block from './Block';
import Route from './Route';

class Router {
  private static __instance: Router;

  public routes: Route[] | undefined;

  public history: History | undefined;

  private readonly _rootQuery: string | undefined;

  private _currentRoute: Route | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes?.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.target as Window;
      this._onRoute(target?.location?.pathname);
    });
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute('/404');
      if (route) route.render();
      this._currentRoute = route;
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.navigate(pathname);
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes?.find((route) => route.match(pathname));
  }
}

export default Router;
