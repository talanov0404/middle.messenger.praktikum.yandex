import Block, { IBlock } from '../../utils/Block';
import template from './messenger.hbs';
import './messenger.scss';
import Link from '../../components/link';
import Chat from './components/chat';
import arrow from '../../../static/arrow.svg';
import Input from '../../components/input';
import Button from '../../components/button';
import paperclip from '../../../static/paperclip.svg';
import arrowRight from '../../../static/arrow-right.svg';
import dotsHorizontal from '../../../static/dots-horizontal.svg';
import Routes from '../const';

const chats = require('./messenger.json');

interface IMessengerPageProps extends IBlock {
  link: InstanceType<typeof Link>,
  src: string,
  chatList: [Chat],
  selectedChat: boolean,
  name: string
}

export default class MessengerPage extends Block<IMessengerPageProps> {
  private message: string = '';

  protected init() {
    this.children.link = new Link({
      text: 'Профиль',
      route: Routes.Settings,
    });

    this.children.inputMessage = new Input({
      type: 'text',
      name: 'message',
      events: {
        input: () => {
          this.message = (this.children.inputMessage.getContent() as HTMLInputElement).value;
        },
      },
    });

    this.children.buttonAddFile = new Button({
      src: paperclip,
      events: {
        click: () => console.log('прикрепили файл'),
      },
    });
    this.children.buttonAddFile.getContent()?.classList.add('add-file');

    this.children.buttonSend = new Button({
      src: arrowRight,
      events: {
        click: () => {
          let result = false;
          if (!this.message) {
            result = true;
          }
          if (result) return;
          console.log({
            message: this.message,
          });
        },
      },
    });
    this.children.buttonSend.getContent()?.classList.add('send');

    this.children.buttonInfo = new Button({
      src: dotsHorizontal,
      events: {
        click: () => console.log('Информаци о чате'),
      },
    });
    this.children.buttonInfo.getContent()?.classList.add('information');

    this.children.chatList = chats.map((chat: Record<string, string>) => {
      const { name, time, count } = chat;
      return new Chat({
        name,
        time,
        count,
        events: {
          click: () => this.setProps({ ...this.props, selectedChat: true, name }),
        },
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, src: arrow });
  }
}
