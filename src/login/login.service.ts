import { User } from "@prisma/client";
import { inject, injectable } from "inversify";
import { UserRepository } from "../user/user.repository";
import { TYPES } from "../injection/types";
import { CustomError } from "../util/customRoute";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { Request, Response } from "express";

@injectable()
export class LoginService implements LoginServiceInterface {

    @inject(TYPES.UserRepositoryInterface) private userRepository!: UserRepository;
    _bcrypt = bcrypt;

    async login(partialUser: Omit<User, 'id'>) {
        const user = await this.userRepository.findUserByIdOrUserName(undefined, partialUser.userName);

        if(!user)
            throw new CustomError(401, 'Usuário ou senha incorreta');

        if(!partialUser.password || !user.password)
            throw new CustomError(401, 'Usuário ou senha incorreta')

        const isPassword = await this._bcrypt.compare(partialUser.password, user.password)

        if(!isPassword)
            throw new CustomError(401, 'Usuário ou senha incorreta');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password, ...clearUser} = user;

        const token = jwt.sign(clearUser, process.env.TOKEN as string);

        return token
    }

    async middlewareLogin(req: LoginMiddleWareRequest, res: Response, next: () => void) {
        const decodedToken = jwt.decode(req.cookies.token)

        if(!decodedToken || typeof decodedToken == 'string' || !decodedToken.id)
            throw new CustomError(401, 'Usuário não autenticado');

        const user = await this.userRepository.findUserByIdOrUserName(decodedToken.id);

        if(!user)
            throw new CustomError(401, 'Usuário não autenticado');
        
        req.user = user;

        next();
    }

}

export interface LoginServiceInterface {
    login: (partialUser: Omit<User, 'id'>) => Promise<string>
    middlewareLogin(req: Request, res: Response, next: () => void): void
}

export type LoginMiddleWareRequest = Request & { user: User }