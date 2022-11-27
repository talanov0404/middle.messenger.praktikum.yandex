import Block from '../../../utils/Block';
import template from './footer.hbs';
import Button from '../../button';
import Link from '../../link';

type TFooterProps = {
  button: Button;
  link: Link
};

export default class Footer extends Block<TFooterProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
