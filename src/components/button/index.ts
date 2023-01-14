import { Block, IBlock } from '../../utils/Block';
import template from './button.hbs';
import './button.scss';

interface IButtonProps extends IBlock {
  src?: string,
  label?: string,
  events?: {
    click: (event: Event) => void,
  },
}

export default class Button extends Block<IButtonProps> {
  protected render() {
    return this.compile(template, { ...this.props });
  }
}
