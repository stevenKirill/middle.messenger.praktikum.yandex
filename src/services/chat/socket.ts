import EventBus from 'core/EventBus';
import { store } from 'core/store';
import {
  convertMessagesToObject,
  costructDate,
  transformTime,
} from './messageUtils';
import { TChatMessageItem } from './types';

export default class WSTransport extends EventBus {
  static EVENTS = {
    OPEN: 'open',
    CLOSE: 'close',
    CONNECTED: 'connected',
    MESSAGE: 'message',
    ERROR: 'error',
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
    return new Promise((resolve) => {
      // TODO сделать так чтобы сообщения загружались сразу после открытия сокета
      // без setTimeout
      setTimeout(() => {
        this.emit(WSTransport.EVENTS.CONNECTED);
      }, 1000);
      resolve(this);
    });
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
      if (!event.wasClean) {
        setTimeout(() => this.connect(), 100);
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener(WSTransport.EVENTS.MESSAGE, (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === 'pong') {
        console.log(parsedData); // для проверки что пинг идет
        return;
      }
      if (Array.isArray(parsedData)) {
        const oldMessages = convertMessagesToObject(parsedData);
        store.dispatch({ messages: oldMessages });
      } else {
        const newMessage = parsedData as TChatMessageItem;
        const date = costructDate(newMessage.time);
        const prevMessages = store.getState().messages;
        const group = prevMessages[date];
        if (group) {
          store.dispatch({
            messages: {
              ...prevMessages,
              [date]: [
                ...group,
                { ...newMessage, formatTime: transformTime(newMessage.time) },
              ],
            },
          });
        } else {
          store.dispatch({
            messages: {
              ...prevMessages,
              [date]: [
                { ...newMessage, formatTime: transformTime(newMessage.time) },
              ],
            },
          });
        }
      }
    });

    socket.addEventListener(WSTransport.EVENTS.ERROR, (event) => {
      console.log('Ошибка', event);
    });
  }
}
