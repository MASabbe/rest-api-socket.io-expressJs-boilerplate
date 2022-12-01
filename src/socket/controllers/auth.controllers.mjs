import httpStatus from 'http-status';
import {DateTime} from 'luxon';
import adminModel from '../../models/admin.model.mjs';
import refreshTokenModel from '../../models/refreshToken.model.mjs';
import {jwtExpirationInterval} from '../../config/vars.mjs';
const generateTokenResponse = async (user, accessToken) => {
  const tokenType = 'Bearer';
  const refreshToken = await refreshTokenModel.generate(user).token;
  const expiresIn = DateTime.utc().plus({minute: jwtExpirationInterval});
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
};
const signIn = async (data) => {
  const {user, accessToken} = await adminModel.login(data);
  const token = await generateTokenResponse(user, accessToken);
  console.log(user)
  return {
    status: httpStatus.OK,
    data: {token, user: adminModel.transform(user)},
  }
}
export default {
  signIn
}
