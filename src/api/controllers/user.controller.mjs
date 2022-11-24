import httpStatus from 'http-status';
import lodas from 'lodash';
import adminModel from '../models/admin.model.mjs';
const {omit} = lodas;
/**
 * Load user and append to req.
 * @public
 */
const load = async (req, res, next, id) => {
  try {
    const user = await adminModel.findById(id);
    req.locals = {user};
    return next();
  } catch (error) {
    return next(error);
  }
};
/**
 * Get user
 * @public
 */
const get = (req, res) => {
  return res.json(adminModel.transform(req.locals.user));
};
/**
 * Get logged in user info
 * @public
 */
const loggedIn = (req, res) => {
  return res.json(adminModel.transform(req.user));
};
/**
 * Create new user
 * @public
 */
const create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};
/**
 * Replace existing user
 * @public
 */
const replace = async (req, res, next) => {
  try {
    const {user} = req.locals;
    const newUser = new User(req.body);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.updateOne(newUserObject, {override: true, upsert: true});
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};
/**
 * Update existing user
 * @public
 */
const update = async (req, res, next) => {
  const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  const user = Object.assign(req.locals.user, updatedUser);

  user.save()
      .then((savedUser) => res.json(savedUser.transform()))
      .catch((e) => next(User.checkDuplicateEmail(e)));
};
/**
 * Get user list
 * @public
 */
const list = async (req, res, next) => {
  try {
    const users = await adminModel.list(req.query);
    const transformedUsers = users.map((user) => adminModel.transform(user));
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};
/**
 * Delete user
 * @public
 */
const remove = async (req, res, next) => {
  const {user} = req.locals;

  user.remove()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch((e) => next(e));
};
export default {
  load,
  get,
  loggedIn,
  create,
  replace,
  update,
  list,
  remove,
};
