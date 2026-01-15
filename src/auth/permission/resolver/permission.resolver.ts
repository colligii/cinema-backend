import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PermissionService } from '../service/permission.service';
import { CreatePermission } from '../dto/create-permission.dto';
import { Permission } from '../entity/permission.entity';
import { PaginatedPermissionResponse } from '../dto/paginated_permission.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { UpdatePermission } from '../dto/update-permission.dto';
import { PermissionWithCategoryResponse } from '../dto/permission_with_category_response.dto';

@Resolver()
export class PermissionResolver {

    constructor(
        private readonly permissionService: PermissionService
    ) {}

    @Mutation(() => Permission)
    async createPermission(
        @Args('body') body: CreatePermission
    ): Promise<Permission> {
        return this.permissionService.createPermission(body)
    }

    @Query(() => PermissionWithCategoryResponse)
    async getPermissionById(
        @Args('id') id: string
    ): Promise<Permission> {
        return this.permissionService.getPermissionById(id);
    }

    @Query(() => PaginatedPermissionResponse)
    async paginatedPermission(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedPermissionResponse> {
        return this.permissionService.paginatedPermission(body);
    }

    @Mutation(() => Permission)
    async updatePermission(
        @Args('body') body: UpdatePermission
    ): Promise<Permission> {
        return this.permissionService.updatePermission(body);
    }

    @Mutation(() => Permission)
    async deletePermission(
        @Args('id') id: string
    ): Promise<Permission> {
        return this.permissionService.deletePermission(id);
    }
}
