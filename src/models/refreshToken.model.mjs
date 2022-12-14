import httpStatus from 'http-status';
import {DateTime} from 'luxon';
import crypto from 'crypto';
import mysql from '../config/mysql.mjs';
import MysqlHelper from '../helper/mysql.helper.mjs';
import APIError from '../api/errors/api-error.mjs';
const pool = mysql.pool;
const mysqlHelper = new MysqlHelper(pool);
const table = 'tbl_admin_refresh_token';
const generate = async () => {
  const now = DateTime.utc();
  const userId = user.id;
  const username = user.username;
  const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
  const expires = now.plus({day: 30});
  const save = await mysqlHelper.insertData(table, `token=${pool.escape(token)},id_user=${userId},username=${pool.escape(username)},expires=${pool.escape(expires.toISO({includeOffset: false}))},date_created=${pool.escape(now.toISO({includeOffset: false}))}`);
  return {
    id: save.insertId,
    token: token,
  };
};
const findOneAndRemove = async (data) => {
  const {username, token} = data;
  const err = {
    status: httpStatus.UNAUTHORIZED,
    isPublic: true,
  };
  const check = await mysqlHelper.getOneData(table, 'id,id_user,username,expires', `username = ${pool.escape(username)} AND token = ${pool.escape(token)}`, 'id ASC');
  if (check.length <= 0) {
    err.message = 'Invalid refresh token. Token not found';
    throw new APIError(err);
  }
  await mysqlHelper.deleteData(table, `id=${check.data.id}`, 1);
  return {
    username: check.data.username,
    userId: check.data.id_user,
    expires: check.data.expires,
  };
};
export default {
  generate,
  findOneAndRemove,
};
