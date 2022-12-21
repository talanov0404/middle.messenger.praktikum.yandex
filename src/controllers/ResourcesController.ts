import ResourcesAPI from '../api/ResourcesAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import Routes from '../pages/const';

class ResourcesController {
  private readonly api = new ResourcesAPI();

  public async upload(data: FormData) {
    await this.request(async () => {
      await this.api.upload(data);

      router.go(Routes.Messenger);
    });
  }

  public async fetchData(path: string) {
    await this.request(async () => {
      await this.api.request(path);
    });
  }

  protected async request(req: () => void) {
    store.set('resources.isUploading', true);

    try {
      req();

      store.set('resources.error', undefined);
    } catch (e: any) {
      console.error(e.message);
      store.set('resources.error', e.message);
    } finally {
      store.set('resources.isUploading', false);
    }
  }
}

export default new ResourcesController();
