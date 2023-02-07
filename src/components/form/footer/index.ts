import { Block, IBlock } from '../../../utils/Block';
import template from './footer.hbs';
import Button from '../../button';
import Link from '../../link';

interface IFooterProps extends IBlock {
  button: Button;
  link: InstanceType<typeof Link>
}

export default class Footer extends Block<IFooterProps> {
  protected render() {
    return this.compile(template, { ...this.props });
  }
}
