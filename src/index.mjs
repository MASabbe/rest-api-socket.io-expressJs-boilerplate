import logger from './config/logger.mjs';
import {appName, appVersion, env, port} from './config/vars.mjs';
import './config/mysql.mjs';
import './config/redis.mjs';
// import './config/mongoose.mjs';
import httpServer from './app.mjs';
const server = httpServer.listen(port, logger.info(`${appName.toUpperCase()} v${appVersion} socket server started on port ${port} (${env})`));
const exitHandler = () => {
  server.close(() => {
    logger.info('Server closed');
    process.exit(1);
  });
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  server.close();
});
