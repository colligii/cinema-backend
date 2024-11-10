import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import { UserRepository } from "./user.repository";
import { TYPES } from "../injection/types";
import { CustomError } from "../util/customRoute";
import bcrypt from "bcrypt"

@injectable()
export class UserService implements UserServiceInterface {

    @inject(TYPES.UserRepositoryInterface) private userRepository!: UserRepository;
    _bcrypt = bcrypt;

    async findById(user: User) {
        const _user = await this.userRepository.findUserByIdOrUserName(user.id);

        return _user;
    }

    async createUser(user: User) {
        const _user = await this.userRepository.findUserByIdOrUserName(user.id, user.userName);

        if(_user)
            throw new CustomError(400, 'Usuário com esse id já existente')

        const _password = await this._bcrypt.hash(user.password, 12)

        const createdUser = this.userRepository.createUser({
            id: user.id,
            userName: user.userName,
            password: _password
        })

        return createdUser;
    }
}

export interface UserServiceInterface {
    findById(user: User): Promise<User | null>
    createUser(user: User): Promise<User> 
}