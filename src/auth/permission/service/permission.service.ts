import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entity/permission.entity';
import { Repository, DataSource } from 'typeorm';;
import { CreatePermission } from '../dto/create-permission.dto';
import { PermissionHelper } from '../helper/permission.helper';
import { PaginatedPermissionResponse } from '../dto/paginated_permission.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { UpdatePermission } from '../dto/update-permission.dto';

@Injectable()
export class PermissionService {

    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) {}

    async createPermission(body: CreatePermission): Promise<Permission> {
        return this.dataSource.transaction(async (manager) => {
            const findedPermission = await manager.findOne(Permission, {
                where: {
                    code: body.code
                },
                lock: {
                    mode: 'pessimistic_read'
                }
            })

            if(findedPermission)
                throw new BadRequestException(PermissionHelper.PermissionAlreadyExists);

            const createdPermission = manager.create(Permission, body);
            return manager.save(createdPermission);
        })
    }

    async getPermissionById(id: string): Promise<Permission> {
        const findedPermission = await this.permissionRepository.findOne({
            where: {
                id
            }
        })

        if(!findedPermission)
            throw new NotFoundException(PermissionHelper.PermissionNotExists);

        return findedPermission;
    }

    async paginatedPermission(body: PaginatedInput): Promise<PaginatedPermissionResponse> {
        const permissionQueryBuilder = this.permissionRepository.createQueryBuilder();

        return this.paginationBuilder
            .buildPaginationClass(permissionQueryBuilder)
            .applyFilters(body.keyword, ['code', 'description'])
            .getPagination(body.size, body.page, 'created_at')    
    }

    async updatePermission(body: UpdatePermission): Promise<Permission> {
        return this.dataSource.transaction(async (manager) => {
            const findedPermission = await manager.findOne(Permission, {
                where: { id: body.id },
                lock: { mode: 'pessimistic_write' }
            })

            if(!findedPermission)
                throw new NotFoundException(PermissionHelper.PermissionNotExists);

            findedPermission.description = body?.description ?? findedPermission.description;

            return manager.save(findedPermission);
        })
    }


    async deletePermission(id: string): Promise<Permission> {
        const findedPermission = await this.permissionRepository.findOne({
            where: {
                id
            }
        })

        if(!findedPermission)
            throw new NotFoundException(PermissionHelper.PermissionNotExists);

        this.permissionRepository.delete(id)
        return findedPermission;
    }

}
