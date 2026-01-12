import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUser } from '../dto/create_user.dto';
import { UserHelper } from '../helper/user.helper';
import bcrypt from 'bcrypt';
import { UserResponse } from '../dto/user_response.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedUserResponse } from '../dto/paginated_user_response.dto';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { UpdateUser } from '../dto/update_user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) { }

    async createUser(body: CreateUser): Promise<UserResponse> {
        return this.dataSource.transaction(async (manager) => {
            const user = await manager.findOne(User, {
                where: { email: body.email },
                lock: { mode: 'pessimistic_write' }
            })

            if (user)
                throw new NotFoundException(UserHelper.UserAlreadyExists)

            const hashedPassword = bcrypt.hashSync(body.password, 12);
            const createdUser = this.userRepository.create({ ...body, password: hashedPassword });

            const { password, ...savedUser } = await manager.save(createdUser);

            return savedUser;
        })
    }

    async getUserById(id: string): Promise<UserResponse> {
        const findedUser = await this.userRepository.findOne({
            where: { id }
        })

        if (!findedUser)
            throw new NotFoundException(UserHelper.UserNotFound);

        return findedUser;
    }

    async paginatedUsers(body: PaginatedInput): Promise<PaginatedUserResponse> {
        const userQueryBuilder = this.userRepository.createQueryBuilder('user')

        return this.paginationBuilder
            .buildPaginationClass(userQueryBuilder)
            .applyFilters(body.keyword, ['name', 'last_name', 'email'])
            .getPagination(body.size, body.page, 'created_at')

    }

    async updateUser(body: UpdateUser): Promise<UserResponse> {
        return this.dataSource.transaction(async (manager) => {
            const findedUser = await manager.findOne(User, {
                where: {
                    id: body.id
                },
                lock: {
                    mode: 'pessimistic_write'
                }
            })

            if(!findedUser)
                throw new NotFoundException(UserHelper.UserNotFound);

            if(body.password)
                findedUser.password = bcrypt.hashSync(body.password, 12);

            findedUser.name = body.name ?? findedUser.name;
            findedUser.last_name = body.last_name ?? findedUser.last_name;
            
            return manager.save(findedUser);
        })
    }

    async deleteUser(id: string): Promise<UserResponse> {
        const findedUser = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!findedUser)
            throw new NotFoundException(UserHelper.UserNotFound);

        await this.userRepository.delete(id);

        return findedUser;
    }

}
