import { Server } from "socket.io";

const io = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000'],
    }
});

io.on('connection', (socket: any) => {
    console.log('someone is connected', socket.id);

    socket.on('custom-event', (string: String) => {
        console.log(`custom-event fired, received: ${string}`);
        //handles custom-receive-message
        //emit sends to ALL clients
        io.emit('receive-message', string);
        //this sends to all clients EXCEPT the one who sent it
        // socket.broadcast.emit('custom-recieve-message', string)
    })
    
    //emits all rooms, on the event 'send-all-rooms'
    socket.on('get-rooms', () => {
        //TODO send to socket.id only, not all connections
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
})