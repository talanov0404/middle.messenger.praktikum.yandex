import Block, { IBlock } from '../../../../../../utils/Block';
import template from './message.hbs';
import './message.scss';

interface MessageProps extends IBlock {
  content: string;
  isMine: boolean;
}

export default class Message extends Block<MessageProps> {
  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
