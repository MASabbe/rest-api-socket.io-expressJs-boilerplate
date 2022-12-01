import eventValidator from "../../middlewares/events.mjs"
import authEvent from "./auth.event.mjs";
export default (io, socket) => {
  authEvent(socket);
}
