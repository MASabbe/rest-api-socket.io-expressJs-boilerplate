import express from 'express';
import {validate} from 'express-validation';
import controller from '../../controllers/auth.controller.mjs';
import {adminOtp, adminUpdatePassword, login, register, oAuth, refresh, sendPasswordReset, passwordReset} from '../../validations/auth.validation.mjs';
const router = express.Router();
/**
 * @api {post} v1/auth/register Register
 * @apiDescription Register a new admin
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission super admin
 *
 * @apiBody  {String}          username     Admin's username
 * @apiBody  {String{6..128}}  password  Admin's password
 *
 * @apiSuccess (Created 201) {String}  token.tokenType     Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken   Authorization Token
 * @apiSuccess (Created 201) {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 * @apiSuccess (Created 201) {String}  token.timezone      The server's Timezone
 *
 * @apiSuccess (Created 201) {String}  user.id         Admin's id
 * @apiSuccess (Created 201) {String}  user.name       Admin's name
 * @apiSuccess (Created 201) {String}  user.email      Admin's email
 * @apiSuccess (Created 201) {String}  user.role       Admin's role
 * @apiSuccess (Created 201) {Date}    user.createdAt  Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/register').post(validate(register), controller.register);
/**
 * @api {post} v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiBody  {String}         username     Admin's username
 * @apiBody  {String{..128}}  password  Admin's password
 *
 * @apiSuccess  {String}  token.tokenType     Access Token's type
 * @apiSuccess  {String}  token.accessToken   Authorization Token
 * @apiSuccess  {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess  {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 *
 * @apiSuccess  {String}  user.id             Admin's id
 * @apiSuccess  {String}  user.name           Admin's name
 * @apiSuccess  {String}  user.email          Admin's email
 * @apiSuccess  {String}  user.role           Admin's role
 * @apiSuccess  {Date}    user.createdAt      Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
router.route('/signIn').post(validate(login), controller.login);
router.route('/update-password').post(validate(adminUpdatePassword), controller.updatePassword);
router.route('/admin-otp').post(validate(adminOtp), controller.adminOtp);
/**
 * @api {post} v1/auth/refresh-token Refresh Token
 * @apiDescription Refresh expired accessToken
 * @apiVersion 1.0.0
 * @apiName RefreshToken
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiBody  {String}  email         Admin's email
 * @apiBody  {String}  refreshToken  Refresh token aquired when user logged in
 *
 * @apiSuccess {String}  tokenType     Access Token's type
 * @apiSuccess {String}  accessToken   Authorization Token
 * @apiSuccess {String}  refreshToken  Token to get a new accessToken after expiration time
 * @apiSuccess {Number}  expiresIn     Access Token's expiration time in miliseconds
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or refreshToken
 */
router.route('/refresh-token').post(validate(refresh), controller.refresh);
router.route('/send-password-reset').post(validate(sendPasswordReset), controller.sendPasswordReset);
router.route('/reset-password').post(validate(passwordReset), controller.resetPassword);
export default router;
