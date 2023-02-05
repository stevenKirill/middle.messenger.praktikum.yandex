import EventBus from 'core/EventBus';
import { store } from 'core/store';
import { selectMessages } from './selectors';

export default class WSTransport extends EventBus {
  static EVENTS = {
    OPEN: 'open',
    CLOSE: 'close',
    CONNECTED: 'connected',
    MESSAGE: 'message',
    ERROR: 'erroe',
  } as const;

  private socket: WebSocket | null = null;

  private pingInterval: NodeJS.Timer | undefined = undefined;

  constructor(public url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }
    this.socket.send(JSON.stringify(data));
  }

  public connect() {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setPing();
  }

  public close() {
    this.socket?.close();
    this.emit(WSTransport.EVENTS.CLOSE);
  }

  private setPing() {
    this.pingInterval = setInterval(() => this.send({ type: 'ping' }), 2000);
    this.on(WSTransport.EVENTS.CLOSE, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener(WSTransport.EVENTS.OPEN, () => {
      console.log('Соединение установлено');
    });
    socket.addEventListener(WSTransport.EVENTS.CLOSE, (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log('обрыв');
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener(WSTransport.EVENTS.MESSAGE, (event) => {
      console.log('Получены данные', event.data);
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === 'pong') {
        return;
      }
      const prevMessages = selectMessages();
      store.dispatch({
        messages: [...prevMessages, parsedData],
      });
    });

    socket.addEventListener(WSTransport.EVENTS.ERROR, (event) => {
      console.log('Ошибка', event.message);
    });
  }
}
