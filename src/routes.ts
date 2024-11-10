import { Router } from "express";
import _pingRoutes from "./ping/ping.routes";
import _userRoutes from "./user/user.routes";
import _loginRoutes from "./login/login.routes";
import _sessionRoutes from "./session/session.routes";

const router = Router();

router.use('/ping', _pingRoutes)
router.use('/user', _userRoutes)
router.use('/login', _loginRoutes)
router.use('/session', _sessionRoutes)

export default router;