import SocketError from '../../errors/socket-error.mjs';
import Error from "../../middlewares/error.mjs";
import controller from '../../controllers/auth.controllers.mjs';
import {signIn} from '../../validations/auth.validation.mjs';
export default (socket) => {
  socket.on('auth:signIn', (data,callback) => {
    const { error, value } = signIn.validate(data);
    if (error){
      return Error.convert(error, callback);
    }
    controller.signIn(value).then(r => callback(r)).catch(e => callback(new SocketError(e)));
  });
  socket.on('auth:register', (data,callback) => {
    const { error, value } = signIn.validate(data);
    if (error){
      return Error.convert(error, callback);
    }
    controller.signIn(value).then(r => callback(r)).catch(e => callback(new SocketError(e)));
  });
}
