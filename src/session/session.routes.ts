
import { TYPES } from "../injection/types";
import { myContainer } from "../inversify.config";
import { LoginServiceInterface } from "../login/login.service";
import CustomRoute from "../util/customRoute";
import { SessionInput } from "./validation/session.input";

const _routes = new CustomRoute(myContainer.get(TYPES.SessionControllerInterface))
const _loginService = myContainer.get(TYPES.LoginServiceInterface) as LoginServiceInterface
 
_routes.post('/', 'createSession', {
    middleware: _loginService.validateRole(['ADMIN']),
    dataValidation: SessionInput
})

export default _routes.routes;