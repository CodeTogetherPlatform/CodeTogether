import { Server } from 'socket.io';
import { ReadableByteStreamController } from 'stream/web';

const io = new Server(3001, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.on('connection', (socket: any) => {
  console.log('someone is connected', socket.id);

  const filterRoomsWithTwo = (roomList: Map<string, Set<string>>) => {
    const arrayRoomList = Array.from(roomList);
    let filteredRoomList: Array<string> = [];
    for (let i = 0; i < arrayRoomList.length; i++) {
      if (arrayRoomList[i][0].length === 6 && arrayRoomList[i][1].size === 1) {
        filteredRoomList.push(arrayRoomList[i][0]);
      }
    }
    return filteredRoomList;
  };

  //emits all rooms, on the event 'send-all-rooms'
  socket.on('get-rooms', () => {
    io.to(socket.id).emit('send-all-rooms', filterRoomsWithTwo(io.sockets.adapter.rooms));
  });

  // create room
  socket.on('start-session', (roomId: string) => {
    console.log('start session', roomId);

    if (roomId in io.sockets.adapter.rooms) {
      socket.to(socket.id).emit('error-event', 'error: room exists.');
    } else {
      socket.join(roomId);
      io.emit('send-all-rooms', filterRoomsWithTwo(io.sockets.adapter.rooms));
    }
  });

  // join a room
  socket.on('join-session', (roomId: string) => {
    console.log('join session', roomId);

    socket.join(roomId);

    let usersInRoom: string[] = [];
    Array.from(io.sockets.adapter.rooms).forEach((room) => {
      if (room[0] === roomId) {
        usersInRoom.push(...Array.from(room[1]));
      }
    });
    if (usersInRoom.length === 2) {
      io.to(usersInRoom).emit('start-programming', roomId);
    } else {
      socket.to(socket.id).emit('error-event', 'no room');
    }
  });

  // on new messages
  socket.on('message-created', (userName: string, message: string, roomId: string) => {
    io.to(roomId).emit('new-message', message, userName);
  });

  // on code changes
  socket.on('code-update', (code: string, roomId: string, user: string) => {
    io.to(roomId).emit('code-change', code, user);
  });

  socket.on('get-pp', (roomId: string) => {
    //emit event 'requested-pp to roomId
    socket.to(roomId).emit('requested-pp');
    // const users = io.sockets.adapter.rooms.get(roomId);
    // if (users) socket.to(roomId).emit('navigator', Array.from(users)[0]);
  });

  socket.on('send-pp', (roomId: string, username: string) => {
    //emit event 'receive-pp' to roomId with username
    const users = io.sockets.adapter.rooms.get(roomId);
    socket.to(roomId).emit('receive-pp', username, Array.from(users!)[0]);
  });


  socket.on('change-controller', (roomId: string) => {
    socket.to(roomId).emit('change-control');
  });

});
