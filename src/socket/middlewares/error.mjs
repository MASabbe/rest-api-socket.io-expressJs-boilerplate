import httpStatus from 'http-status';
import {env} from '../../config/vars.mjs';
import SocketError from "../errors/socket-error.mjs";
const handler = (err, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };
  if (env === 'production') {
    delete response.stack;
  }
  return next(response);
}
const convert = (err,next) => {
  let converted = err;
  if (!err instanceof SocketError){
    converted = new SocketError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    })
  }
  return handler(converted, next);
}
const notFound = (next) => {
  const error = new SocketError({
    message: "Event not found",
    status: httpStatus.NOT_FOUND,
  });
  return handler(error, next);
}
export default {
  convert,
  notFound,
}
