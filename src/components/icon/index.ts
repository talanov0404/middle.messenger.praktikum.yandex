import Block from '../../utils/Block';
import template from './icon.hbs';
import './icon.scss';

type TIconProps = {
  src: string,
};

export default class Icon extends Block<TIconProps> {
  render() {
    return this.compile(template, { label: this.props.src });
  }
}
