import BaseAPI from './BaseAPI';

export default class ChatMessagesAPI extends BaseAPI {
  constructor() {
    super('api/v1/messages');
  }

  public create() {
    return this.http.post('/', { title: 'string' });
  }

  request({ id }: { [key in string ]: number }) {
    return this.http.get(`/${id}`);
  }

  public logout() {
    return this.http.post('/logout');
  }

  update = undefined;
  delete = undefined;
}
