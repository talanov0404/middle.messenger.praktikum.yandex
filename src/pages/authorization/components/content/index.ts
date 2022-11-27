import Block from '../../../../utils/Block';
import template from './content.hbs';
import EntryField from '../../../../components/entryField';

type TContentProps = {
  login: EntryField,
  password: EntryField
};

export default class Content extends Block<TContentProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
