import httpStatus from 'http-status';
import ExtendableError from '../../config/extandable-error.mjs';
class SocketError extends ExtendableError{
  /**
   * Creates an Socket.IO error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false}) {
    super({message, status, isPublic});
  }
}
export default SocketError;
