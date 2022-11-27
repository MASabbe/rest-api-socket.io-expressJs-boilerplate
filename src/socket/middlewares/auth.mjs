import error from './error.mjs';
import SocketError from '../errors/socket-error.mjs';
export const auth = (handshake, next) => {
  try{
    const error = new SocketError({
      message: "Unauthorized socket connection."
    });
    const token = handshake.auth.token;
    if (!token){
      error.message = "Unauthorized socket connection. Err no socket token";
      return next(error);
    }
    next();
  }catch (e) {
    next(error.convert(e));
  }
}
export const authorize = (req,next) => {
  try{
    console.log(req);
    next();
  }catch (e) {
    next(error.handler(e));
  }
}
