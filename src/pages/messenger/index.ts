import Block from '../../utils/Block';
import template from './messenger.hbs';
import './messenger.scss';
import ChatsController from '../../controllers/ChatsController';
import ChatsList from './components/chatsList/chatsList';
import Messenger from './components/messenger';

export default class MessengerPage extends Block {
  protected init() {
    this.children.messenger = new Messenger({});

    this.children.chatsList = new ChatsList({ isLoaded: false });

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
