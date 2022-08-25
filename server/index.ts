import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { connection, sio } from './utils/socket.js';
import cors from 'cors';

interface RequestIo extends Request {
  io?: any;
}

const app = express();
const server = createServer(app);
const io = sio(server);
connection(io);

const socketIOMiddleware = (req: RequestIo, res: Response, next: NextFunction) => {
  req.io = io;
  next();
};

//CORS
app.use(cors);

//ROUTES
app.use('api/joinRoom', socketIOMiddleware, (req: RequestIo, res: Response) => {
  req.io?.emit('message', `Hello, ${req.originalUrl}`);
  res.send('hello world');
});

//LISTEN
server.listen(3001, () => {
  console.log('Server running on port 3001');
});

/**
 * catch all for non-existent routes
 */
app.use('/', (req: Request, res: Response) => {
  res.status(404).send();
});

/**
 * Global error handler
 */
app.use('/', (err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
