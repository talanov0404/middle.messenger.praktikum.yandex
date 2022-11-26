import Block from '../../utils/Block';
import template from './link.hbs';
import './link.scss';

type TLinkProps = {
  text: string,
  events?: {
    click?: (event?: MouseEvent) => void,
  },
};

export default class Link extends Block<TLinkProps> {
  render() {
    return this.compile(template, { text: this.props.text });
  }
}
