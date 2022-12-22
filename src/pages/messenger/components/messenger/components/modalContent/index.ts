import Block, { IBlock } from '../../../../../../utils/Block';
import template from './modalContent.hbs';
import './modalContent.scss';
import EntryField from '../../../../../../components/entryField';
import { Regexp } from '../../../../../../const';

interface IModalContent extends IBlock {
  handler?: () => void,
  events?: {
    submit: () => void,
  },
}

export default class ModalContent extends Block<IModalContent> {
  public get value() {
    if (this.props.addChat) {
      return (this.children.chatName as EntryField).value;
    }
    return (this.children.login as EntryField).value;
  }

  public clear() {
    (this.children.login as EntryField).value = '';
    (this.children.chatName as EntryField).value = '';
  }

  protected init() {
    this.children.chatName = new EntryField({
      name: 'chatName',
      label: 'Имя чата',
      regexp: Regexp.message,
    });

    this.children.login = new EntryField({
      name: 'login',
      label: 'Логин',
      regexp: Regexp.login,
      error: 'Неверный логин',
    });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
