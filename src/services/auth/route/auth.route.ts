import { Request, Response, NextFunction, Router } from "express";
import { check, sanitize, validationResult } from "express-validator";

import HttpException from "etc/exceptions/HttpException";

import { authenticate } from "./../../../middlewares/passport/passport.middleware";


const AuthRouter = Router();

const routeName = "auth";

// Login user
AuthRouter.post("/login", authenticate, (req: Request, res: Response, next: NextFunction) => {
    res.send({ isLogged: req.isAuthenticated() });
});

// Logout user
AuthRouter.get("/logout", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.logout();
        res.send({ isLogged: req.isAuthenticated() });
    }
    catch (err) {
        console.error(err)
        next(new HttpException(err.message));
    }
});

export { AuthRouter };