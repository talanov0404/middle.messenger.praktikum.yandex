import { Block, IBlock } from '../../../../utils/Block';
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
import MessagesController from '../../../../controllers/MessagesController';
import Message from './components/message';

interface IMessengerProps extends IBlock {
  selectedChat: number,
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<IMessengerProps> {
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.inputMessage = new Input({
      type: 'text',
      name: 'message',
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
          const { value } = (this.children.inputMessage as Input);

          if (!value) {
            result = true;
          }

          if (result) return;

          MessagesController.sendMessage(this.props.selectedChat, value);

          (this.children.inputMessage as Input).value = '';
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

  protected componentDidUpdate(oldProps: IMessengerProps, newProps: IMessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return oldProps !== newProps;
  }

  private createMessages(props: IMessengerProps) {
    return props.messages.map((data) => (
      new Message({ ...data, isMine: props.userId === data.user_id })
    ));
  }

  protected render() {
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
      userId: state.user?.data?.id,
    };
  }

  return {
    messages: [...(state.messages || {})[selectedChatId] || []],
    selectedChat: selectedChatId,
    userId: state.user?.data?.id,
    name: selectedChat!.title,
    avatar: selectedChat!.avatar,
  };
});

const Messenger = withSelectedChatMessages(MessengerBase as typeof Block);
export default Messenger;
