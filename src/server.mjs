import {createServer} from 'http';
import { Server } from "socket.io";
import passport from 'passport';
import app from './config/express.mjs';
import logger from './config/logger.mjs';
import {auth, authorize} from './socket/middlewares/auth.mjs';
import event from "./socket/events/v1/index.mjs";
const httpServer = createServer(app);
const io = new Server(httpServer, {
  serveClient: false,
});
const wrap = middleware => (socket,next) => middleware(socket.request,{},next);
io.use(wrap(passport.initialize()));
io.use((socket, next) => auth(socket.handshake, next));
io.use((socket, next) => authorize(socket.handshake, next));
io.on("connection", (socket) => {
  event(io,socket);
  socket.on("disconnect", (reason) => {
    if (reason)
      logger.info(reason);
  });
  socket.on("error", (err) => {
    console.log(err)
    socket.disconnect(err);
  });
});
/**
 * Exports express
 * @public
 */
export default httpServer;
