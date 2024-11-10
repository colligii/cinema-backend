import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CreatedUser, UserRepository } from "./user.repository";
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

    async createUser(user: CreatedUser) {
        const _user = await this.userRepository.findUserByIdOrUserName(user.id, user.userName, user.email);

        if(_user)
            throw new CustomError(400, 'Usuário com esse id já existente')

        if(!user.password && user.isActive)
            throw new CustomError(400, 'O usuário precisa de uma senha para ser criado!')
        
        let _password = null;

        if(user.password) {
            _password = await this._bcrypt.hash(user.password, 12)
        }

        const createdUser = this.userRepository.createUser({
            userName: user.userName,
            password: _password,
            role: user.role,
            isActive: user.isActive,
            email: user.email,
            ...(user.id ? { id: user.id } : {})
        })

        return createdUser;
    }
}

export interface UserServiceInterface {
    findById(user: User): Promise<User | null>
    createUser(user: CreatedUser): Promise<User> 
}