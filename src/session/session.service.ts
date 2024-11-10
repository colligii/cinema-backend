
import { Session } from '@prisma/client';
import 'dotenv/config'
import { inject, injectable } from 'inversify';
import { SessionRepositoryInterface } from './session.repository';
import { CustomError, DefaultMessage } from '../util/customRoute';
import { TYPES } from '../injection/types';
import { UserServiceInterface } from '../user/user.service';

@injectable()
export class SessionService implements SessionServiceInterface {

    @inject(TYPES.SessionRepositoryInterface) private _sessionRepository!: SessionRepositoryInterface;
    @inject(TYPES.UserServiceInterface) private _userService!: UserServiceInterface

    async createSession(session: Session, userId: string) {
        const _session = await this._sessionRepository.getSessionByName(session.name);

        if(_session)
            throw new CustomError(400, 'Sessão já criada');

        const createdSession = await this._sessionRepository.createSession(session.name, userId);

        return createdSession;
    }

    async inviteUser(sessionName: string, email: string, userId: string) {

        const _session = await this._sessionRepository.getSessionByName(sessionName, {
            createdBy: true
        });

        if(!_session || _session.createdById != userId)
            throw new CustomError(400, 'Sessão invalida!');

        await this._userService.createUser({
            email: email,
            isActive: false,
            role: "GUEST",
        })

        return new DefaultMessage('Usuário Convidado com sucesso!')
    }

}

export interface SessionServiceInterface {
    createSession(session: Session, userId: string): Promise<Session>
    inviteUser(sessionName: string, inviteEmail: string, userId: string): Promise<DefaultMessage>
}
