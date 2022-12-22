import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import store from '../utils/Store';
import { Message } from '../types/interfaces';
import ChatsController from './ChatsController';

class MessagesController {
  private transports: Map<number, WSTransport> = new Map();

  public async connect(id: number) {
    if (this.transports.has(id)) {
      return;
    }

    const token = await ChatsController.getToken(id);
    const userId = store.getState().user.data.id;

    const wsTransport = new WSTransport(`/${userId}/${id}/${token}`);

    this.transports.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  public sendMessage(id: number, content: string) {
    const transport = this.transports.get(id);

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    transport.send({
      type: 'message',
      content,
    });
  }

  public fetchOldMessages(id: number) {
    const transport = this.transports.get(id);

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    transport.send({
      type: 'get old',
      content: '0',
    });
  }

  closeAll() {
    Array.from(this.transports.values()).forEach((transport) => transport.close());
  }

  private async onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);

    await ChatsController.fetchChats();
  }

  private onClose(id: number) {
    this.transports.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) => this.onMessage(id, message));
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export default new MessagesController();
