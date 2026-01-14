import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleService } from '../service/role.service';
import { Role } from '../entity/role.entity';
import { CreateRole } from '../dto/create_role.dto';
import { PaginatedRoleResponse } from '../dto/paginated_role_response.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { UpdateRole } from '../dto/update_role.dto ';

@Resolver()
export class RoleResolver {
    
    constructor(
        private readonly roleService: RoleService
    ) {}


    @Mutation(() => Role)
    async createRole(
        @Args('body') body: CreateRole
    ): Promise<Role> {
        return this.roleService.createRole(body);
    }

    @Query(() => Role)
    async getRoleById(
        @Args('id') id: string
    ): Promise<Role> {
        return this.roleService.getRoleById(id);
    }

    @Query(() => PaginatedRoleResponse)
    async paginatedRole(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedRoleResponse> {
        return this.roleService.paginatedRole(body);
    }

    @Mutation(() => Role)
    async updateRole(
        @Args('body') body: UpdateRole
    ): Promise<Role> {
        return this.roleService.updateRole(body);
    }

    @Mutation(() => Role)
    async deleteRole(
        @Args('id') id: string
    ): Promise<Role> {
        return this.roleService.deleteRole(id);
    }

}
