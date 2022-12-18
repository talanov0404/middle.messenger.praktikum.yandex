import Block, { IBlock } from '../../../../utils/Block';
import template from './header.hbs';
import './header.scss';
import Avatar from '../avatar';

interface IHeaderProps extends IBlock {
  name: string;
  avatar?: string;
}

export default class Header extends Block<IHeaderProps> {
  protected init() {
    this.children.avatar = new Avatar({ avatar: this.props.avatar });
  }

  render() {
    (this.children.avatar as Avatar).setProps({ avatar: this.props.avatar });
    return this.compile(template, { ...this.props });
  }
}
