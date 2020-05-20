import { Router } from "express";

// Routes import
import { VersionRouter } from "services/version/route/version.route";
import { UserRouter } from "./services/user/user.module";
import { AuthRouter } from "./services/auth/auth.module";

const router = Router();

router.use('/version', VersionRouter);
router.use('/auth', AuthRouter);

router.use('/user', UserRouter);


export { router };