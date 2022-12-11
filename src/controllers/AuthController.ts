import AuthAPI from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import { SigninData, SignupData } from '../types/interfaces';
import Routes from '../pages/const';

class AuthController {
  private readonly api = new AuthAPI();

  public async signin(data: SigninData) {
    await this.request(async () => {
      await this.api.signin(data);

      await this.fetchUser();

      router.go(Routes.Messenger);
    });
  }

  public async signup(data: SignupData) {
    await this.request(async () => {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(Routes.Messenger);
    });
  }

  public async logout() {
    await this.request(async () => {
      await this.api.logout();

      router.go(Routes.Authorization);
    });
  }

  public async fetchUser() {
    const user = await this.api.request();

    store.set('user.data', user);
  }

  protected async request(req: () => void) {
    store.set('user.isLoading', true);

    try {
      req();

      store.set('user.error', undefined);
    } catch (e: any) {
      console.error(e.message);
      store.set('user.error', e.message);
    } finally {
      store.set('user.isLoading', false);
    }
  }
}

export default new AuthController();
