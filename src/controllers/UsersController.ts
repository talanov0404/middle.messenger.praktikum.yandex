import UsersAPI from '../api/UsersAPI';
import store from '../utils/Store';
import { Password, UserData } from '../types/interfaces';
import ResourcesController from './ResourcesController';

class UsersController {
  private readonly api = new UsersAPI();

  public async profile(data: UserData) {
    await this.request(async () => {
      const user = await this.api.profile(data);

      store.set('user.data', user);
    });
  }

  public async avatar(data: FormData) {
    await this.request(async () => {
      const user = await this.api.avatar(data);

      store.set('user.data', user);

      const { avatar } = store.getState().user.data;
      if (avatar) {
        await ResourcesController.fetchData(avatar);
      }
    });
  }

  public async password(data: Password) {
    await this.request(async () => {
      await this.api.password(data);
    });
  }

  public async fetchUser(id: number) {
    await this.api.request({ id });
  }

  public async search(login: string) {
    const users = await this.api.search({ login });
    return users;
  }

  protected async request(req: () => void) {
    store.set('user.isSaving', true);

    try {
      await req();

      store.set('user.error', undefined);
    } catch (e: any) {
      console.error(e.reason);
      store.set('user.error', e.reason);
      console.log(store.getState().user);
    } finally {
      store.set('user.isSaving', false);
    }
  }
}

export default new UsersController();
