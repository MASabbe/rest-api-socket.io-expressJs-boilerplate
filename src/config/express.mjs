import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import favicon from 'serve-favicon';
import {logs} from './vars.mjs';
import strategies from './passport.mjs';
import error from '../api/middlewares/error.mjs';
import routes from '../api/routes/v1/index.mjs';
const app = express();
// request logging. dev: console | production: file
app.use(morgan(logs));
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// gzip compression
app.use(compress());
// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());
// secure apps by setting various HTTP headers
app.use(helmet({
  contentSecurityPolicy: false,
}));
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);
// public static files
app.use('/public', express.static(`./public`));
// favicon apps
app.use(favicon(`./public/favicon.ico`));
// mount web routes
app.use('/', express.static(`./public/views`));
// mount api v1 routes
app.use('/v1', routes);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// catch 404 and forward to error handler
app.use(error.notFound);
// error handler, send stacktrace only during development
app.use(error.handler);
export default app;
