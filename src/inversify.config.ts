import { Container } from "inversify";
import { UserService, UserServiceInterface } from "./user/user.service";
import { TYPES } from "./injection/types";
import { UserController, UserControllerInterface } from "./user/user.controller";
import { UserRepository, UserRepositoryInterface } from "./user/user.repository";

const myContainer = new Container();
myContainer.bind<UserServiceInterface>(TYPES.UserServiceInterface).to(UserService)
myContainer.bind<UserControllerInterface>(TYPES.UserControllerInterface).to(UserController);
myContainer.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepository)

export { myContainer };