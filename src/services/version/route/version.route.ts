import { Request, Response, NextFunction, Router } from "express";

import HttpException from "etc/exceptions/HttpException";
import { VersionController } from "../controller/version.controller";


const VersionRouter = Router();
const versionController = new VersionController();

const routeName = "version";

// Login user
VersionRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        versionController.getVersion()
            .then(data => {
                res.send(data);
            }).catch(err => next(new HttpException(err.message)));
    }
    catch (err) {
        console.error(err)
        next(new HttpException(err.message));
    }
});



export { VersionRouter };