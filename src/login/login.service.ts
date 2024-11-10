import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import { UserRepository } from "../user/user.repository";
import { TYPES } from "../injection/types";
import { CustomError } from "../util/customRoute";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import 'dotenv/config'

@injectable()
export class LoginService implements LoginServiceInterface {

    @inject(TYPES.UserRepositoryInterface) private userRepository!: UserRepository;
    _bcrypt = bcrypt;

    async login(partialUser: Omit<User, 'id'>) {
        const user = await this.userRepository.findUserByIdOrUserName(undefined, partialUser.userName);

        if(!user)
            throw new CustomError(401, 'Usuário ou senha incorreta');

        const isPassword = await this._bcrypt.compare(partialUser.password, user.password)

        if(!isPassword)
            throw new CustomError(401, 'Usuário ou senha incorreta');

        const token = jwt.sign(user, process.env.TOKEN as string);

        return token
    }

}

export interface LoginServiceInterface {
    login: (partialUser: Omit<User, 'id'>) => Promise<string>
}