import Block from '../../../../utils/Block';
import template from './header.hbs';
import './header.scss';

type THeaderProps = {
  name: string
};

export default class Header extends Block<THeaderProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
