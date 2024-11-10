import { Container } from "inversify";
import { UserService, UserServiceInterface } from "./user/user.service";
import { TYPES } from "./injection/types";
import { UserController, UserControllerInterface } from "./user/user.controller";
import { UserRepository, UserRepositoryInterface } from "./user/user.repository";
import { LoginService, LoginServiceInterface } from "./login/login.service";
import { LoginController, LoginControllerInterface } from "./login/login.controller";

const myContainer = new Container();
myContainer.bind<UserServiceInterface>(TYPES.UserServiceInterface).to(UserService)
myContainer.bind<UserControllerInterface>(TYPES.UserControllerInterface).to(UserController);
myContainer.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepository);
myContainer.bind<LoginServiceInterface>(TYPES.LoginServiceInterface).to(LoginService)
myContainer.bind<LoginControllerInterface>(TYPES.LoginControllerInterface).to(LoginController)

export { myContainer };