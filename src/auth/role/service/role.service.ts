import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { CreateRole } from '../dto/create_role.dto';
import { RoleHelper } from '../helper/role.helper';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedRoleResponse } from '../dto/paginated_role_response.dto';
import { UpdateRole } from '../dto/update_role.dto ';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) {}

    async createRole(body: CreateRole): Promise<Role> {
        return this.dataSource.transaction(async (manager) => {
            const findedRole = await manager.findOne(Role, {
                where: {
                    name: body.name
                },
                lock: {
                    mode: 'pessimistic_read'
                }
            })

            if(findedRole)
                throw new BadRequestException(RoleHelper.RoleAlreadyExists);

            const createdRole = manager.create(Role, body);
            return manager.save(createdRole);
        })
    }

    async getRoleById(id: string): Promise<Role> {
        const findedRole = await this.roleRepository.findOne({
            where: {
                id
            }
        })

        if(!findedRole)
            throw new NotFoundException(RoleHelper.RoleNotExists);

        return findedRole;
    }

    async paginatedRole(body: PaginatedInput): Promise<PaginatedRoleResponse> {
        const roleQueryBuilder = this.roleRepository.createQueryBuilder('role');

        return this.paginationBuilder
            .buildPaginationClass(roleQueryBuilder)
            .applyFilters(body.keyword, ['name'])
            .getPagination(body.size, body.page, 'created_at')    
    }

    async updateRole(body: UpdateRole): Promise<Role> {
        return this.dataSource.transaction(async (manager) => {
            const findedRole = await manager.findOne(Role, {
                where: { id: body.id },
                lock: { mode: 'pessimistic_write' }
            })

            if(!findedRole)
                throw new NotFoundException(RoleHelper.RoleNotExists);

            findedRole.name = body?.name ?? findedRole.name;

            return manager.save(findedRole);
        })
    }


    async deleteRole(id: string): Promise<Role> {
        const findedRole = await this.roleRepository.findOne({
            where: {
                id
            }
        })

        if(!findedRole)
            throw new NotFoundException(RoleHelper.RoleNotExists);

        this.roleRepository.delete(id)
        return findedRole;
    }
}
