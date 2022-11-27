import httpStatus from 'http-status';
import SocketError from '../../errors/socket-error.mjs';
import Error from "../../middlewares/error.mjs";
export default (socket) => {
  socket.on('signIn', (data, callback) => {
    try{
      callback({
        status: httpStatus.OK,
        data: "asdf"
      });
    }catch (e) {
      callback(Error.convert(e));
    }
  });
}
