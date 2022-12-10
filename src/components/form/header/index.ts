import Block, { IBlock } from '../../../utils/Block';
import template from './header.hbs';

interface IHeaderProps extends IBlock {
  label: string
}

export default class Header extends Block<IHeaderProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
