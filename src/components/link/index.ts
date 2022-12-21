import Block from '../../utils/Block';
import { IPropsWithRouter, withRouter } from '../../hocs/withRouter';
import template from './link.hbs';
import './link.scss';

export interface ILinkProps extends IPropsWithRouter {
  text: string,
  route: string,
  events?: {
    click?: (event?: MouseEvent) => void,
  },
}

class BaseLink extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.route);
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}

const Link = withRouter(BaseLink);
export default Link;
