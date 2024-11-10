import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../injection/types";
import { UserServiceInterface } from "./user.service";
import { CustomError } from "../util/customRoute";

@injectable()
export class UserController implements UserControllerInterface {

    @inject(TYPES.UserServiceInterface) private userService!: UserServiceInterface;

    pong(req: Request, res: Response) {
        res.json({ pong: this.userService.hi() })
    }
    
}

export interface UserControllerInterface {
    pong(req: Request, res: Response): void
}