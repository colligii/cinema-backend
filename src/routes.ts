import { Router } from "express";
import _pingRoutes from "./ping/ping.routes";
import _userRoutes from "./user/user.routes";
import _loginRoutes from "./login/login.routes";

const router = Router();

router.use('/ping', _pingRoutes)
router.use('/user', _userRoutes)
router.use('/login', _loginRoutes)

export default router;