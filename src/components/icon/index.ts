import Block, { IBlock } from '../../utils/Block';
import template from './icon.hbs';
import './icon.scss';

interface IconProps extends IBlock {
  src: string,
}

export default class Icon extends Block<IconProps> {
  protected render() {
    return this.compile(template, { label: this.props.src });
  }
}
