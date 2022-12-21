import BaseAPI from './BaseAPI';

export default class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  public upload(data: FormData) {
    return this.http.post('/', data);
  }

  public request(path: string) {
    return this.http.get(`${path}`);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}
