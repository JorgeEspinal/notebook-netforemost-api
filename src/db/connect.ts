import mongoose from 'mongoose';
import { config } from '../config/config';

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log('ERROR MONGODB');
    console.log(error);
  });
