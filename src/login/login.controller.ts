import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../injection/types";
import { LoginServiceInterface } from "./login.service";

@injectable()
export class LoginController implements LoginControllerInterface {

    @inject(TYPES.LoginServiceInterface) private loginService!: LoginServiceInterface;

    async login(req: Request, res: Response) {
        const token = await this.loginService.login(req.body)
        res.cookie('token', token);
        res.json({ message: 'Logado com sucesso!' })
    }
}

export interface LoginControllerInterface {
    login(req: Request, res: Response): void
}