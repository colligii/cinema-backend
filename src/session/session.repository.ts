import { Prisma, PrismaClient, Session } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class SessionRepository implements SessionRepositoryInterface {

    _prismaClient = new PrismaClient()

    getSessionById(id: string) {
        return this._prismaClient.session.findFirst({
            where: {
                id
            }
        })
    }

    getSessionByName(name: string, include?: Prisma.SessionInclude) {
        return this._prismaClient.session.findFirst({
            where: {
                name
            },
            include: include
        })
    }

    createSession(name: string, userId: string) {
        return this._prismaClient.session.create({
            data: {
                createdById: userId,
                name: name,
            }
        })
    }

}

export interface SessionRepositoryInterface {
    getSessionById(id: string): Promise<Session | null>
    getSessionByName(name: string, include?: Prisma.SessionInclude): Promise<Session | null>
    createSession(name: string, userId: string): Promise<Session>
}

