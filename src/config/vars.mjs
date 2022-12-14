import dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const appName = process.env.APP_NAME;
export const appVersion = process.env.APP_VERSION;
export const jwtSecret = process.env.APP_JWT_SECRET;
export const jwtExpirationInterval = process.env.APP_JWT_EXPIRATION_MINUTES ? process.env.APP_JWT_EXPIRATION_MINUTES : 30;
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
export const redisConfig = {
  'host': process.env.REDIS_DB_HOST,
  'pass': process.env.REDIS_DB_PASS,
  'db': process.env.REDIS_DB_DATABASE,
};
export const mysqlConfig = {
  'host': process.env.MYSQL_DB_HOST,
  'user': process.env.MYSQL_DB_USER,
  'pass': process.env.MYSQL_DB_PASS,
  'db': process.env.MYSQL_DB_DATABASE,
};
export const mongooseConfig = {
  'host': process.env.MONGO_DB_HOST,
  'user': process.env.MONGO_DB_USER,
  'pass': process.env.MONGO_DB_PASS,
  'db': process.env.MONGO_DB_DATABASE,
};
export const telegramApiKey = process.env.APP_TELEGRAM_BOT_API;
export const passwordShakti = process.env.APP_PASSWORD_SAKTI;
