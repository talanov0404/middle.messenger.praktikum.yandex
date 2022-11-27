import Block from '../../../../utils/Block';
import template from './content.hbs';
import EntryField from '../../../../components/entryField';

type TContentProps = {
  email: EntryField,
  login: EntryField,
  firstName: EntryField,
  secondName: EntryField,
  phone: EntryField,
  passwordOne: EntryField
  passwordTwo: EntryField
};

export default class Content extends Block<TContentProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
