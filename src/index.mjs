import {createServer} from 'http';
import {port, env, appName, appVersion} from './config/vars.mjs';
import logger from './config/logger.mjs';
import mysql from './config/mysql.mjs';
import app from './config/express.mjs';
const httpServer = createServer(app);
httpServer.listen(port, async () => {
  try {
    logger.info(`${appName.toUpperCase()} v${appVersion} socket server started on port ${port} (${env})`);
    await Promise.all([
      // open mysql connection
      mysql.connect(),
    ]);
  } catch (e) {
    logger.error(e.stack);
  }
});
/**
 * Exports express
 * @public
 */
export default httpServer;
