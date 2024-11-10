
import { Session } from '@prisma/client';
import 'dotenv/config'
import { inject, injectable } from 'inversify';
import { SessionRepositoryInterface } from './session.repository';
import { CustomError } from '../util/customRoute';
import { TYPES } from '../injection/types';

@injectable()
export class SessionService implements SessionServiceInterface {

    @inject(TYPES.SessionRepositoryInterface) private _sessionRepository!: SessionRepositoryInterface;

    async createSession(session: Session, userId: string) {
        const _session = await this._sessionRepository.getSessionByName(session.name);

        if(_session)
            throw new CustomError(400, 'Sessão já criada');

        const createdSession = await this._sessionRepository.createSession(session.name, userId);

        return createdSession;
    }

}

export interface SessionServiceInterface {
    createSession(session: Session, userId: string): Promise<Session>
}
