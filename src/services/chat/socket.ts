import EventBus from 'core/EventBus';

export default class WSTransport extends EventBus {
  static EVENTS = {
    OPEN: 'ws:open',
    CLOSED: 'ws:closed',
    CLOSING: 'ws:closing',
    CONNECTING: 'ws:connecting',
    GOT_MESSAGE: 'ws:get-message',
    ERROR: 'ws:error',
  } as const;

  private socket: TNullable<WebSocket> = null;

  private pingTimer: NodeJS.Timer | undefined = undefined;

  private pingTimeout = 15000;

  private reconnectTimeout = 3000;

  constructor(private url: string) {
    super();
  }

  getSocket() {
    if (!this.socket) {
      return;
    }

    if (this.socket.readyState === this.socket.CLOSED) {
      this.connect();
    }

    if (this.socket.readyState === this.socket.CONNECTING) {
      return new Promise<WSTransport>((resolve) => {
        this.on(WSTransport.EVENTS.OPEN, () => resolve(this));
      });
    }

    return this;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);
    this.setPing();
    this.emit(WSTransport.EVENTS.CONNECTING);
  }

  sendText(data: chatTypes.TWDataText) {
    this._send(JSON.stringify(data));
  }

  close(code?: number, reason?: string) {
    this.socket?.close(code, reason);

    this.emit(WSTransport.EVENTS.CLOSING);
  }

  private _send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (!this.socket) {
      throw new Error('WS is not open');
    }

    this.socket.send(data);
  }

  private setPing() {
    this.pingTimer = setInterval(() => this.sendText({ type: 'ping' }), this.pingTimeout);

    this.on(WSTransport.EVENTS.CLOSED, () => {
      clearInterval(this.pingTimer);

      this.pingTimer = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.onopen = () => {
      this.emit(WSTransport.EVENTS.OPEN);
    };

    socket.onclose = (event) => {
      if (!event.wasClean) {
        setTimeout(() => this.connect(), this.reconnectTimeout);
      }

      this.emit(WSTransport.EVENTS.CLOSED);
    };

    socket.onerror = (event) => {
      this.emit(WSTransport.EVENTS.ERROR, event);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WSTransport.EVENTS.GOT_MESSAGE, data);
    };
  }
}
