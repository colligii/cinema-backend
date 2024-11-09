import { Router } from "express";
import _pingRoutes from "./ping/ping.routes";

const router = Router();

router.use('/ping', _pingRoutes)

export default router;