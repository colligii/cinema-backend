import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { PermissionCategory } from "../entity/permission_category.entity";
import { PermissionCategoryService } from "../service/permission_category.service";

@Resolver()
export class PermissionCategoryResolver {
    
    constructor(
        private readonly permissionCategoryService: PermissionCategoryService
    ) {}

    @Mutation(() => PermissionCategory)
    async createPermissionCategory(
        @Args('code') code: string
    ): Promise<PermissionCategory> {
        return this.permissionCategoryService.createPermissionCategory(code);
    }

    @Mutation(() => PermissionCategory)
    async deletePermissionCategory(
        @Args('id') id: string
    ): Promise<PermissionCategory> {
        return this.permissionCategoryService.deletePermissionCategory(id);
    }

}