import express from 'express';
import { Request, Response, NextFunction } from 'express';

const app = express();

/**
 * catch all for non-existent routes
 */
app.use('/', (req: Request, res: Response) => {
    res.status(404).send();
})

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

app.listen(3000, () => {
    console.log('Server running on port 3000')
})