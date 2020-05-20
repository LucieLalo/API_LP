import passport from "passport";
import passportLocal, { IVerifyOptions } from "passport-local";
import { Request, Response, NextFunction } from "express";
import { UserModel, UserDocument } from "services/user/models/user.model";
import HttpException from "etc/exceptions/HttpException";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<UserDocument, any>((user, done) => {
  done(undefined, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId)
    .select('role email')
    .exec((err, user) => {
      done(err, user);
    })
});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) { return done(undefined, false, { message: "Invalid email or password." }) }

    return done(undefined, user);
  }

  catch (err) {
    return done(err)
  }
}));

/**
 * Authenticate.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) { return next(new HttpException(err.message)) }

    if (!user) {
      return next(new HttpException("BadCredential"));
    }


    req.logIn(user, (err) => {
      if (err) { return next(new HttpException(err.message)) }
      return next();
    });
  })(req, res, next);
};

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() || req.method === 'OPTIONS') {
    return next();
  }
  next(new HttpException("NotAuthenticated"));
};

/**
 * Login Required middleware.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserDocument;
  // if (user && user.role === "admin") {
  //   return next();
  // }
  next(new HttpException("NotGranted"));
};


