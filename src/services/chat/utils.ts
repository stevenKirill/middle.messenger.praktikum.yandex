import { store } from 'core/store';
import { AppState, Dispatch } from 'core/store/types';

const initSocketListeners = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    store.dispatch((
      dispatch: Dispatch<AppState>,
      state: AppState,
    ) => {
      dispatch({
        messages: [...state.messages, data],
      });
    });
  });

  socket.addEventListener('error', (event) => {
    console.log('Ошибка', event.message);
  });
};

export default initSocketListeners;
