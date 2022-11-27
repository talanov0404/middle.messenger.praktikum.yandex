import Block from '../../../utils/Block';
import template from './header.hbs';

type THeaderProps = {
  label: string
};

export default class Header extends Block<THeaderProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
