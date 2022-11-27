import Block from '../../utils/Block';
import template from './button.hbs';
import './button.scss';

export type IButtonProps = {
  src?: string,
  label?: string,
  events?: {
    click: (event: Event) => void,
  },
};

export default class Button extends Block<IButtonProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
