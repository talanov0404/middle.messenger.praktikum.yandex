import Block from '../utils/Block';
import store, { StoreEvents } from '../utils/Store';
import { isEqual } from '../utils/helpers';

type TState<T = any> = {
  [key in string]: T;
};

export default function withStore(mapStateToProps: (state: TState) => TState) {
  return function wrap(Component: typeof Block) {
    let currentState: TState;
    return class WithStore extends Component {
      constructor(props: TState) {
        currentState = mapStateToProps(store.getState());

        super({ ...props, ...currentState });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(currentState, newState)) {
            this.setProps({ ...newState });
          }

          currentState = { ...newState };
        });
      }
    };
  };
}
