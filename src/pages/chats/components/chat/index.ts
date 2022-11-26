import Block from '../../../../utils/Block';
import template from './chat.hbs';
import './chat.scss';

type TChatProps = {
  name: string,
  time: string,
  count?: string
  events?: {
    click?: (event: Event) => void,
  }
};

export default class Chat extends Block<TChatProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
