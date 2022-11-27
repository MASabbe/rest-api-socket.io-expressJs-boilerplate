import { createClient } from 'redis';
import { redisConfig } from './vars.mjs';
import logger from './logger.mjs';
const options = {
  password: redisConfig.pass,
  socket: {
    host: redisConfig.host,
    port: '6379'
  },
  database: redisConfig.db,
}
const redis = createClient(options);
await redis.connect();
await redis.ping();
logger.info(`'redisDB connected to ${options.socket.host} database ${options.database}`);
export default redis;
