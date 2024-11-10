import { Container } from "inversify";
import { UserService, UserServiceInterface } from "./user/user.service";
import { TYPES } from "./injection/types";
import { UserController, UserControllerInterface } from "./user/user.controller";
import { UserRepository, UserRepositoryInterface } from "./user/user.repository";
import { LoginService, LoginServiceInterface } from "./login/login.service";
import { LoginController, LoginControllerInterface } from "./login/login.controller";
import { SessionService, SessionServiceInterface } from "./session/session.service";
import { SessionController, SessionControllerInterface } from "./session/session.controller";
import { SessionRepository, SessionRepositoryInterface } from "./session/session.repository";

const myContainer = new Container();
myContainer.bind<UserServiceInterface>(TYPES.UserServiceInterface).to(UserService)
myContainer.bind<UserControllerInterface>(TYPES.UserControllerInterface).to(UserController);
myContainer.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepository);
myContainer.bind<LoginServiceInterface>(TYPES.LoginServiceInterface).to(LoginService)
myContainer.bind<LoginControllerInterface>(TYPES.LoginControllerInterface).to(LoginController)
myContainer.bind<SessionServiceInterface>(TYPES.SessionServiceInterface).to(SessionService)
myContainer.bind<SessionControllerInterface>(TYPES.SessionControllerInterface).to(SessionController)
myContainer.bind<SessionRepositoryInterface>(TYPES.SessionRepositoryInterface).to(SessionRepository)

export { myContainer };