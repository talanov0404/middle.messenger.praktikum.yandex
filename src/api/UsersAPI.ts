import BaseAPI from './BaseAPI';
import {
  User, Avatar, Password, Login, UserData,
} from '../types/interfaces';

export default class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public profile(data: UserData): Promise<User> {
    return this.http.put('/profile', data);
  }

  public avatar(data: Avatar): Promise<User> {
    return this.http.put('/profile/avatar', data);
  }

  public password(data: Password) {
    return this.http.put('/password', data);
  }

  public request({ id }: { [key in string]: number }): Promise<User> {
    return this.http.get(`/${id}`);
  }

  public search(data: Login): Promise<User> {
    return this.http.post('/search', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}
