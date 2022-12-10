import BaseAPI from './BaseAPI';

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('api/v1/chats');
  }

  public create() {
    return this.http.post('/', { title: 'string' });
  }

  public request() {
    return this.http.get('/full');
  }

  public logout() {
    return this.http.post('/logout');
  }

  update = undefined;
  delete = undefined;
}
