
import { TYPES } from "../injection/types";
import { myContainer } from "../inversify.config";
import CustomRoute from "../util/customRoute";

const _routes = new CustomRoute(myContainer.get(TYPES.LoginControllerInterface))

_routes.post('/', 'login')

export default _routes.routes;