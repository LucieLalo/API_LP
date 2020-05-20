import { config } from "./config/config";
import express from "express";
import session from "express-session";
import mongo from "connect-mongo";
import passport from "passport";
import * as bodyParser from "body-parser";

import errorMiddleware from './middlewares/error/error.middleware'
import { router } from "./router.module";

const MongoStore = mongo(session);
const day = 3600000 * 24;

class App {
  public app: express.Application;
  //options for cors midddleware

  constructor() {
    // run the express instance and store in app
    this.app = express();
    this.config();
  }

  private config(): void {
    // enable cors by adding cors middleware
    this.configCors();

    // support application/json type post data
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // add Passport middleware
    this.configPassport();

    // add routes
    this.app.use("/api/v1", router);

    // add error handler
    this.app.use(errorMiddleware);
  }

  private configCors(): void {
    this.app.use((req, res, next) => {
      const allowedOrigins = config.cors.allowedOrigin;
      const origin = req.headers.origin as string;
      const controledOrigin = allowedOrigins.indexOf(origin) > -1 ? origin : allowedOrigins[0];
console.log(origin)
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, x-requested-with');
      res.header('Access-Control-Allow-Credentials', "true");
      return next();
    });
  }

  private configPassport(): void {
    this.app.use(session({
      resave: true,
      rolling: true,
      saveUninitialized: true,
      secret: config.secret.jwt!,
      cookie: { maxAge: day * 7 },
      store: new MongoStore({
        url: `${config.mongo.path}/${config.mongo.name}`,
        autoReconnect: true
      })
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
  }
}

export default new App().app;


// logger.debug('Debugging info');
// logger.verbose('Verbose info');
// logger.info('Hello world');
// logger.warn('Warning message');
// logger.error('Error info');
