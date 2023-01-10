import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import notebookRouter from './routes/notebook';

const app = express();

app.use((req, res, next) => {
  console.log(
    `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    console.log(
      `Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  });

  next();
});

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log('ERROR MONGODB');
    console.log(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.get('/api', (_req, res, _next) => {
  res.status(200).json({ message: 'API' });
});

app.use('/notebook', notebookRouter);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  const error = new Error('Not found resource');

  return res.status(404).json({ message: error.message });
});

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}.`);
});
