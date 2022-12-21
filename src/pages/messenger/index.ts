import Block from '../../utils/Block';
import template from './messenger.hbs';
import './messenger.scss';
import ChatsController from '../../controllers/ChatsController';
import Index from './components/chatsList';
import Messenger from './components/messenger';

export default class MessengerPage extends Block {
  protected init() {
    this.children.messenger = new Messenger({});

    this.children.chatsList = new Index({ isLoaded: false });

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
