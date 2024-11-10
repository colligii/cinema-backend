import { Router } from "express";
import _pingRoutes from "./ping/ping.routes";
import _userRoutes from "./user/user.routes"

const router = Router();

router.use('/ping', _pingRoutes)
router.use('/user', _userRoutes)

export default router;