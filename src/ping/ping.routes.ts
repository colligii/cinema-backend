import { PingController } from "./ping.controller";
import CustomRoute from "../util/customRoute";

const _pingRoutes = new CustomRoute(new PingController())

_pingRoutes.get('/', 'pong')

export default _pingRoutes.routes;