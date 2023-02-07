import { Block, IBlock } from '../utils/Block';
import Router from '../utils/Router';

export interface IPropsWithRouter extends IBlock {
  router: typeof Router
}

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<infer P extends IBlock> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & IPropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}
