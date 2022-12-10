import BaseAPI from './BaseAPI';
import { SigninData, SignupData, User } from '../types/interfaces';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  public signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  public request(): Promise<User> {
    return this.http.get('/user');
  }

  public logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}
