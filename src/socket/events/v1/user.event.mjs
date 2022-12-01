import {validate} from 'express-validation';
import {authorize} from '../../middlewares/auth.mjs';
import {LOGGED_USER} from '../../middlewares/auth.mjs';
import controller from '../../controllers/auth.controllers.mjs';
export default (socket) => {
  socket.on('user:profile',authorize(LOGGED_USER),controller.profile);
  socket.on('user:balance',authorize(LOGGED_USER),controller.balance);
}
