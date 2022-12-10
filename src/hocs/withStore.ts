import Block from '../utils/Block';
import store, { StoreEvents } from '../utils/Store';
import { isEqual } from '../utils/helpers';

type TState<T = any> = {
  [key in string]: T;
};

export default function withStore(mapStateToProps: (state: TState) => TState) {
  return function wrap(Component: typeof Block) {
    let state: TState;
    return class WithStore extends Component {
      constructor(props: TState) {
        state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };
}
