/** @format */

import mongoose from 'mongoose';
import config from 'config';
import log from '../src/logger';

const db = config.get('mongoURI') as string;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    log.info('Database Connected ...');
  } catch (error) {
    log.error('Database Connection Failed', error);
    process.exit(1);
  }
};

export default connectDB;
