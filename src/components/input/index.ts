import Block, { IBlock } from '../../utils/Block';
import template from './input.hbs';
import './input.scss';

interface IInputProps extends IBlock {
  type?: string,
  name: string,
  value?: string,
  events?: {
    input?: (event: Event) => void,
    blur?: (event: Event) => void,
    focus?: (event: Event) => void,
  },
}

export default class Input extends Block<IInputProps> {
  public set value(newValue: string) {
    this.setProps({ ...this.props, value: newValue });
  }

  public get value(): string {
    return (this.element as HTMLInputElement).value;
  }

  public get name(): string {
    return (this.element as HTMLInputElement).name;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
