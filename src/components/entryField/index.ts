import Block, { IBlock } from '../../utils/Block';
import template from './entryField.hbs';
import './entryField.scss';
import Input from '../input';

interface IEntryFieldProps extends IBlock {
  label: string,
  input: Input,
  focus?: boolean,
  error?: string,
}

export default class EntryField extends Block<IEntryFieldProps> {
  public set error(newValue: string) {
    this.setProps({ ...this.props, error: newValue });
  }

  public addClass(...args: [string]) {
    args.forEach((item) => this.element?.classList.add(item));
  }

  public removeClass(...args: [string]) {
    args.forEach((item) => this.element?.classList.remove(item));
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
