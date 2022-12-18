import Block, { IBlock } from '../../../../utils/Block';
import template from './messenger.hbs';
import './messenger.scss';
import arrow from '../../../../../static/arrow.svg';
import Input from '../../../../components/input';
import Button from '../../../../components/button';
import paperclip from '../../../../../static/paperclip.svg';
import arrowRight from '../../../../../static/arrow-right.svg';
import dotsHorizontal from '../../../../../static/dots-horizontal.svg';
import { ChatInfo, Message as MessageInfo } from '../../../../types/interfaces';
import withStore from '../../../../hocs/withStore';
import Menu from './components/menu';

interface IMessengerProps extends IBlock {
  selectedChat: number,
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<IMessengerProps> {
  private message: string = '';

  protected init() {
    this.children.inputMessage = new Input({
      type: 'text',
      name: 'message',
      events: {
        input: () => {
          this.message = ((this.children.inputMessage as Input)
            .getContent() as HTMLInputElement).value;
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

    this.children.chatAction = new Button({
      src: dotsHorizontal,
      events: {
        click: () => this.setProps({ ...this.props, activeMenu: !this.props.activeMenu }),
      },
    });
    this.children.chatAction.getContent()?.classList.add('information');

    this.children.headerMenu = new Menu({
      handler: () => {
        this.setProps({ ...this.props, activeMenu: false });
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, src: arrow });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;
  const chats = state.chats || [] as ChatInfo[];
  const selectedChat = chats.find(({ id }) => id === state.selectedChat);

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.data.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: selectedChat!.id,
    name: selectedChat!.title,
    avatar: selectedChat!.avatar,
  };
});

const Messenger = withSelectedChatMessages(MessengerBase as typeof Block);
export default Messenger;
