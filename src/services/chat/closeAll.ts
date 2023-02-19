import { sockets } from './constants';

const closeAllSockets = () => {
  Object.values(sockets).forEach((socket) => {
    socket.close();
  });
};

export default closeAllSockets;
