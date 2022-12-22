import EventBus from './EventBus';

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

type TWSTransportEvents<P> = {
  [WSTransportEvents.Connected]: [];
  [WSTransportEvents.Error]: [P];
  [WSTransportEvents.Message]: [P];
  [WSTransportEvents.Close]: [];
};

export default class WSTransport extends EventBus<TWSTransportEvents<any>> {
  static WS_URL = 'wss://ya-praktikum.tech/ws/chats';
  protected url: string;
  private socket: WebSocket | null = null;

  constructor(endpoint: string) {
    super();
    this.url = `${WSTransport.WS_URL}${endpoint}`;
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        this.setupPing();
        resolve();
      });
    });
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    const pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(pingInterval);
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'pong' || data.type === 'user connected') {
        return;
      }

      this.emit(WSTransportEvents.Message, data);
    });
  }
}
