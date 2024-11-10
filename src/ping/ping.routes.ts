import { PingController } from "./ping.controller";
import CustomRoute from "../util/customRoute";

const _routes = new CustomRoute(new PingController())

_routes.get('/', 'pong')

export default _routes.routes;