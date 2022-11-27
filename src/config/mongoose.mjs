import mongoose from 'mongoose';
import logger from './logger.mjs';
import {mongooseConfig, env} from './vars.mjs';
const url = `mongodb://${mongooseConfig.host}:27017/${mongooseConfig.db}`;
const options = {
  user:mongooseConfig.user,
  pass:mongooseConfig.pass,
}
await mongoose.connect(url, options);
logger.info(`'mongoDB connected to ${mongooseConfig.host} database ${mongooseConfig.db}`);
export default mongoose;
