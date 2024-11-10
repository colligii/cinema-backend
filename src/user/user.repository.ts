import { Prisma, PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements UserRepositoryInterface {

    _prismaClient = new PrismaClient()

    async findUserByIdOrUserName(id?: string, userName?: string | null | undefined, email?: string | null | undefined) {
        const _where: { id?: string, userName?: string, email?: string } = {}

        if(id)
            _where.id = id;

        if(userName)
            _where.userName = userName;

        if(email)
            _where.email = email;

        if(Object.entries(_where).length == 0)
            throw new Error('Filtros sem usuário ou id')

        const user = await this._prismaClient.user.findFirst({
            where: {..._where, isActive: true}
        });

        return user;
    }

    async createUser(user: CreatedUser) {
        const _user = await this._prismaClient.user.create({
            data: user
        })

        return _user;
    } 

}

export type CreatedUser = Omit<Prisma.UserCreateInput, "id"> & {
    id?: string
}

export interface UserRepositoryInterface {
    findUserByIdOrUserName(id?: string, userName?: string | null | undefined, email?: string | null | undefined): Promise<User | null>
    createUser(user: CreatedUser): Promise<User>
}

