import { Server } from 'socket.io';

const sio = (server) => {
  return new Server(server, {
    transport: ['polling'],
    cors: { origin: '*' },
  });
};

const connection = (io) => {
  io.on('connection', (socket) => {
    console.log('a user is connected');

    socket.on('message', (message) => {
      console.log(`message from ${socket.id}, ${message}`);
      socket.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};

export { sio, connection };
