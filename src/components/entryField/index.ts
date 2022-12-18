import Block, { IBlock } from '../../utils/Block';
import template from './entryField.hbs';
import './entryField.scss';
import Input from '../input';
import { regexpTest, TRegexp } from '../../utils/validate';

interface IEntryFieldProps extends IBlock {
  type?: string,
  name: string,
  value?: string,
  regexp: TRegexp,
  label: string,
  focus?: boolean,
  error?: string,
}

export default class EntryField extends Block<IEntryFieldProps> {
  constructor(props: IEntryFieldProps) {
    const updateProps = { ...props };
    if (!updateProps.type) {
      updateProps.type = 'text';
    }
    super(updateProps);
  }

  protected blurHandler() {
    const { value } = this.children.input as Input;
    if (!value) {
      this.removeClass('focus');
    }
    if (!regexpTest(this.props.regexp, (this.children.input as Input).value)) {
      this.addClass('error');
    } else {
      this.removeClass('error');
    }
  }

  public set error(newValue: string) {
    this.setProps({ ...this.props, error: newValue });
  }

  public addClass(...args: [string]) {
    args.forEach((item) => this.element?.classList.add(item));
  }

  public removeClass(...args: [string]) {
    args.forEach((item) => this.element?.classList.remove(item));
  }

  public set value(newValue: string) {
    this.setProps({ ...this.props, value: newValue });
    (this.children.input as Input).setProps({ ...this.props, value: newValue });
  }

  public get value(): string {
    return (this.children.input as Input).value;
  }

  public get name(): string {
    return (this.children.input as Input).name;
  }

  public get regexp() {
    return this.props.regexp;
  }

  protected init() {
    this.children.input = new Input({
      type: this.props.type,
      name: this.props.name,
      value: this.props.value,
      events: {
        focus: () => {
          this.addClass('focus');
          this.removeClass('error');
        },
        blur: () => {
          this.blurHandler();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
