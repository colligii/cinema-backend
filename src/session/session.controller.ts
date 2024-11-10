import { inject, injectable } from "inversify";
import { TYPES } from "../injection/types";
import { SessionServiceInterface } from "./session.service";
import { Response } from "express";
import { LoginMiddleWareRequest } from "../login/login.service";


@injectable()
export class SessionController implements SessionControllerInterface {

    @inject(TYPES.SessionServiceInterface) private sessionService!: SessionServiceInterface

    async createSession(req: LoginMiddleWareRequest, res: Response) {
        const _session = await this.sessionService.createSession(req.body, req.user.id);
        res.json(_session)
    }

    async inviteUserToSession(req: LoginMiddleWareRequest, res: Response) {
        const message = await this.sessionService.inviteUser(req.body?.session, req.body.email, req.user.id)
        res.json(message)
    }

}

export interface SessionControllerInterface {
    createSession(req: LoginMiddleWareRequest, res: Response): void
    inviteUserToSession(req: LoginMiddleWareRequest, res: Response): void
}