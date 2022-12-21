import BaseAPI from './BaseAPI';
import { ChatInfo, User } from '../types/interfaces';

export default class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChat(): Promise<ChatInfo[]> {
    return this.http.get('/');
  }

  public create(title: string) {
    return this.http.post('/', { title });
  }

  public delete(id: number) {
    return this.http.delete('/', { chatId: id });
  }

  public addUsers(id: number, users: number[]) {
    return this.http.put('/users', { users, chatId: id });
  }

  public getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  public deleteUsers(id: number, users: number[]) {
    return this.http.delete('/users', { users, chatId: id });
  }

  public async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  request = undefined;
  update = undefined;
}
