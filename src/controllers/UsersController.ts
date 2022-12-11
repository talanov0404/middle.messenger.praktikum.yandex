import UsersAPI from '../api/UsersAPI';
import store from '../utils/Store';
import { Password, UserData } from '../types/interfaces';

class UsersController {
  private readonly api = new UsersAPI();

  public async profile(data: UserData) {
    await this.request(async () => {
      const user = await this.api.profile(data);

      store.set('user.data', user);
    });
  }

  public async password(data: Password) {
    await this.request(async () => {
      await this.api.password(data);
    });
  }

  protected async request(req: () => void) {
    store.set('user.isSaving', true);

    try {
      await req();

      store.set('user.error', undefined);
    } catch (e: any) {
      console.error(e.message);
      store.set('user.error', e.message);
    } finally {
      store.set('user.isSaving', false);
    }
  }
}

export default new UsersController();
