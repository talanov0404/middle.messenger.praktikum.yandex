import Block from '../../../../../../utils/Block';
import template from './profileField.hbs';
import './profileField.scss';

type TProfileFieldProps = {
  name: string,
  value: string,
};

export default class ProfileField extends Block<TProfileFieldProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
