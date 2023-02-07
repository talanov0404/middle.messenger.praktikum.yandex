import { Block, IBlock } from '../utils/Block';
import store, { StoreEvents } from '../utils/Store';
import { Indexed, isEqual } from '../utils/helpers';
import { ChatInfo, Message, User } from '../types/interfaces';

interface State {
  user: {
    data: User,
    error: string,
    isSaving: boolean,
  };
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export default function withStore<SP extends IBlock>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let currentState = mapStateToProps(store.getState());

        super({ ...(props as P), ...currentState });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(currentState as Indexed, newState as Indexed)) {
            this.setProps({ ...newState });
          }

          currentState = { ...newState };
        });
      }
    };
  };
}
