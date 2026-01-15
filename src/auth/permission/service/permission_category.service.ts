import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionCategory } from "../entity/permission_category.entity";
import { Repository } from "typeorm";
import { PermissionCategoryHelper } from "../helper/permission_category.helper";
@Injectable()
export class PermissionCategoryService {
    constructor(
        @InjectRepository(PermissionCategory)
        private readonly permissionCategoryRepository: Repository<PermissionCategory>
    ) {}

    async createPermissionCategory(code: string): Promise<PermissionCategory> {
        const findedPermissionCategory = await this.permissionCategoryRepository.findOne({
            where: {
                code
            }
        })

        if(findedPermissionCategory)
            throw new BadRequestException(PermissionCategoryHelper.AlreadyExists)

        const createdPermissionCategory = this.permissionCategoryRepository.create({
            code
        })

        return this.permissionCategoryRepository.save(createdPermissionCategory)
    }

    async deletePermissionCategory(id: string): Promise<PermissionCategory> {
        const findedPermissionCategory = await this.permissionCategoryRepository.findOne({
            where: {
                id
            },
            relations: [
                'permission'
            ]
        })

        if(!findedPermissionCategory)
            throw new NotFoundException(PermissionCategoryHelper.NotExists);

        if(findedPermissionCategory.permission && findedPermissionCategory.permission?.length)
            throw new BadRequestException(PermissionCategoryHelper.HaveAssignedInPermission)    
        
        await this.permissionCategoryRepository.delete(id);

        return findedPermissionCategory;

    }
}