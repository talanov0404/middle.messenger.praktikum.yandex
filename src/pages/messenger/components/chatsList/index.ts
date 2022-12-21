import Block, { IBlock } from '../../../../utils/Block';
import template from './chatsList.hbs';
import Chat from './components/chat';
import './chatsList.scss';
import withStore from '../../../../hocs/withStore';
import { ChatInfo } from '../../../../types/interfaces';
import ChatsController from '../../../../controllers/ChatsController';
import Link from '../../../../components/link';
import Loader from '../../../../components/loader';
import Routes from '../../../const';

interface ChatsListProps extends IBlock {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.settingsLink = new Link({
      text: 'Профиль',
      route: Routes.Settings,
    });

    this.children.chats = this.createChats(this.props);

    this.children.loader = new Loader();
  }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return oldProps !== newProps;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map<Block>((data) => (
      new Chat({
        ...data,
        time: data?.last_message?.time ? new Date(data.last_message.time).toLocaleString() : '',
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      })));
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

const Index = withChats(ChatsListBase as typeof Block);
export default Index;
