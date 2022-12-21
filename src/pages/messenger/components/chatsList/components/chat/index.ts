import Block, { IBlock } from '../../../../../../utils/Block';
import template from './chat.hbs';
import './chat.scss';
import { ChatInfo } from '../../../../../../types/interfaces';
import withStore from '../../../../../../hocs/withStore';
// import ResourcesController from '../../../../../../controllers/ResourcesController';

interface IChatProps extends IBlock {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
}

class ChatBase extends Block<IChatProps> {
  protected render() {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}

const withSelectedChat = withStore((state) => {
  const selectedChat = ((state.chats || []) as ChatInfo[])
    .find(({ id }) => id === state.selectedChat);

  return {
    selectedChat,
  };
});

const Chat = withSelectedChat(ChatBase as typeof Block) as typeof Block;
export default Chat;
