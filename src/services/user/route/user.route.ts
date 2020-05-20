import { Request, Response, NextFunction, Router } from "express";
import { isAuthenticated, isAdmin } from "../../../middlewares/passport/passport.middleware";

import HttpException from "etc/exceptions/HttpException";

import { UserController } from "../controller/user.controller";
import { UserDocument } from "../models/user.model";

const UserRouter = Router();
const userController = new UserController();

const routeName = "user";

// Create user
UserRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("body : ", req.body);
        userController.create(req.body)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                throw new Error(err.message);
            });
    }
    catch (err) {
        next(new HttpException(err.message));
    }

});

// Get users list.
UserRouter.get("/", isAuthenticated, isAdmin, (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.getList()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                throw new Error(err.message);
            });
    }

    catch (err) {
        next(new HttpException(err.message));
    }
});

// Get current user.
UserRouter.get("/me", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.getMe(req.user as UserDocument)
            .then(data => {
                res.send(data);
            }).catch(err => next(new HttpException(err.message)));
    }

    catch (err) {
        next(new HttpException(err.message));
    }
});

export { UserRouter };