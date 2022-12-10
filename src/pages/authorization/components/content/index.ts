import Block, { IBlock } from '../../../../utils/Block';
import template from './content.hbs';
import EntryField from '../../../../components/entryField';

interface IContentProps extends IBlock {
  login: EntryField,
  password: EntryField
}

export default class Content extends Block<IContentProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
