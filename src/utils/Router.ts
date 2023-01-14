import { Block, IBlock } from './Block';
import Route from './Route';
import Routes from '../pages/const';

export interface BlockConstructable<P extends IBlock = any> {
  new(props: P): Block<P>;
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private currentRoute: Route | null = null;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this._onRoute(Routes.Notfound);
      return;
    }
    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public reset() {
    this.routes = [];
    this.currentRoute = null;
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');
