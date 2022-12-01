import BearerStrategy from 'passport-http-bearer';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import {jwtSecret} from './vars.mjs';
import authProviders from '../services/authProviders.mjs';
import adminModel from '../models/admin.model.mjs';
const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};
const oAuth = (service) => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};
const jwt = new JWTStrategy(jwtOptions, async (payload, done)=>{
  try {
    const user = await adminModel.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
const jwtSocket = new JWTStrategy(jwtOptions, async (payload, done)=>{
  try {
    console.log(payload)
    const user = await adminModel.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
const facebook = new BearerStrategy(oAuth('facebook'));
const google = new BearerStrategy(oAuth('google'));
export default {
  jwt,
  jwtSocket,
  facebook,
  google,
};
