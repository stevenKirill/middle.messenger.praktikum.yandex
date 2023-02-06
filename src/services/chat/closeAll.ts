import { sockets } from './actions';

const closeAllSockets = () => {
  Object.values(sockets).forEach((socket) => {
    socket.close();
  });
};

export default closeAllSockets;
