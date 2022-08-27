import { Server } from "socket.io";

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000'],
    }
});

io.on('connection', (socket: any) => {
    console.log('someone is connected', socket.id);
    
    //emits all rooms, on the event 'send-all-rooms'
    socket.on('get-rooms', () => {
        io.to(socket.id).emit('send-all-rooms', Array.from(io.sockets.adapter.rooms))
    })

    // create room 
    socket.on('start-session', (roomId: string) => {
        if(roomId in io.sockets.adapter.rooms){
            socket.to(socket.id).emit('error-event', 'error: room exists.');
        }
        else{
            socket.join(roomId);
            io.emit('send-all-rooms', Array.from(io.sockets.adapter.rooms))
        }
        
    })
    
    // join a room
    socket.on('join-session', (roomId: string) => {
        socket.join(Number(roomId));
        const usersInRoom: string[] = Array.from(io.sockets.adapter.rooms[roomId])
        io.to(usersInRoom).emit('start-programming', roomId);
    })
})