import mysql from 'mysql2';
import logger from './logger.mjs';
import {mysqlConfig, env} from './vars.mjs';
const mysqlOptions = {
  'host': mysqlConfig.host,
  'user': mysqlConfig.user,
  'password': mysqlConfig.pass,
  'database': mysqlConfig.db,
  'connectionLimit': 50,
  'multipleStatements': true,
  'timezone': '+00:00',
  'waitForConnections': true,
  'queueLimit': 0
};
// print mysql logs in dev env
if (env === 'development') {
  Object.assign(mysqlOptions, {debug: false});
}
/**
 * Connect to mysql db
 *
 * @returns {object} Mysql pooling connection
 * @public
 */
const pool = mysql.createPool(mysqlOptions);
const connecting = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          logger.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          logger.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
          logger.error('Database connection was refused.');
        }
        reject(err);
      }
      logger.info('mysqlDB connected to '+mysqlOptions.host+' ('+mysqlOptions.database+')');
      connection.release();
      resolve();
    });
  });
}
await connecting();
export default pool;
