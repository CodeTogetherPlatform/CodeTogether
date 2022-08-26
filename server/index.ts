// import express from 'express';
// import { Request, Response, NextFunction } from 'express';

// const app = express();

// /**
//  * catch all for non-existent routes
//  */
// app.use('/', (req: Request, res: Response) => {
//     res.status(404).send();
// })

// /**
//  * Global error handler
//  */
//  app.use('/', (err: any, req: Request, res: Response, next: NextFunction) => {
//     const defaultErr = {
//         log: 'Express error handler caught unknown middleware error',
//         status: 500,
//         message: { err: 'An error occurred' },
//     };
//     const errorObj = { ...defaultErr, ...err };
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000')
// })

// import { Require } from 'socket.io';

// const io = require('socket.io')(3001, {
//     cors: {
//         origin: ['http://localhost:3000'],
//     }
// });

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
        io.emit('send-all-rooms', io.sockets.adapter.rooms)
    })

    // create room 
    socket.on('start-session', (roomId: string) => {
        if(roomId in io.sockets.adapter.rooms){
            socket.to(socket.id).emit('error-event', 'error: room exists.');
        }
        else{
            socket.join(roomId);
            console.log(io.sockets.adapter.rooms);
            io.emit('send-all-rooms', io.sockets.adapter.rooms)
        }
        
    })
})