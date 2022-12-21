import ChatsAPI from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api = new ChatsAPI();

  public async create(title: string) {
    await this.request(async () => {
      await this.api.create(title);

      await this.fetchChats();
    });
  }

  async delete(id: number) {
    await this.request(async () => {
      store.set('selectedChat', undefined);

      await this.api.delete(id);

      await this.fetchChats();
    });
  }

  public async fetchChats() {
    const chats = await this.api.getChat();

    store.set('chats', chats);

    await Promise.all(chats.map(async (chat) => MessagesController.connect(chat.id)));
  }

  public async addUserToChat(id: number, userId: number) {
    await this.api.addUsers(id, [userId]);
  }

  public async deleteUserToChat(id: number, userId: number) {
    await this.api.deleteUsers(id, [userId]);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  public selectChat(id: number) {
    store.set('selectedChat', id);
  }

  protected async request(req: () => void) {
    try {
      req();
    } catch (e: any) {
      console.error(e.reason);
    }
  }
}

export default new ChatsController();
