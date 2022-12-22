import Block, { IBlock } from '../../../../../../utils/Block';
import template from './profileField.hbs';
import './profileField.scss';

interface IProfileFieldProps extends IBlock {
  name: string,
  value: string,
}

export default class ProfileField extends Block<IProfileFieldProps> {
  protected render() {
    return this.compile(template, { ...this.props });
  }
}
