import sockets from './constants';

Object.values(sockets).forEach((socket) => {
  socket.close();
});
