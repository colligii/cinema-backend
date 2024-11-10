
import { TYPES } from "../injection/types";
import { myContainer } from "../inversify.config";
import CustomRoute from "../util/customRoute";
import { LoginInput } from "./validation/login.input";

const _routes = new CustomRoute(myContainer.get(TYPES.LoginControllerInterface))
 
_routes.post('/', 'login', {
    dataValidation: LoginInput
})

export default _routes.routes;