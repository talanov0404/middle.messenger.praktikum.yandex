import Block from '../../utils/Block';
import template from './entryField.hbs';
import './entryField.scss';
import Input from '../input';

type TEntryFieldProps = {
  label: string,
  input: Input,
  error?: string,
};

export default class EntryField extends Block<TEntryFieldProps> {
  public set error(newValue: string) {
    this.setProps({ ...this.props, error: newValue });
  }

  public addClass(...args: [string]) {
    args.forEach((item) => this.getContent()?.classList.add(item));
  }

  public removeClass(...args: [string]) {
    args.forEach((item) => this.getContent()?.classList.remove(item));
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
