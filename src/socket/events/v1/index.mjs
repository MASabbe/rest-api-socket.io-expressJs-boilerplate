import eventValidator from "../../middlewares/events.mjs"
import authEvent from "./auth.event.mjs";
export default (socket, next) => {
  socket.use(([event,data,callback]) => {
    try{
      if (typeof data !== "object"){
        return next("Error data")
      }
      console.log(event,data,callback)
      next();
    }catch (e) {
      next(e);
    }
  });
  authEvent(socket);
}
