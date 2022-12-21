import { set } from './helpers';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

type TStoreProps<P> = {
  [StoreEvents.Updated]: [P];
};

export class Store extends EventBus<TStoreProps<Record<string, any>>> {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export default new Store();
