import httpStatus from 'http-status';
import passport from 'passport';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import strategies from '../../config/passport.mjs';
import error from './error.mjs';
import SocketError from '../errors/socket-error.mjs';
const jwtOptions = {
  secretOrKey: 'abetest',
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};
export const LOGGED_USER = 'User';
export const authorize = async (handshake,next) => {
  try{
    const authorization = handshake.headers.authorization;
    if (authorization){
      passport.use(new JWTStrategy(jwtOptions, (payload, done) => {
        done(null,{username:'1234124afs'})
      }));
    }
    next();
  }catch (e) {
    next(error.handler(e));
  }
}
export const auth = (handshake,next) => {
  try{
    const token = handshake.auth.token;
    const error = new SocketError({
      message: "Unauthorized socket connection",
      status: httpStatus.UNAUTHORIZED,
    });
    if (!token){
      error.message = "Unauthorized socket connection. Err no socket token";
      return next(error);
    }
    next();
  }catch (e) {
    next(error.convert(e));
  }
}
