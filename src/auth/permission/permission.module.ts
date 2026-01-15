import { Module } from '@nestjs/common';
import { PermissionService } from './service/permission.service';
import { PermissionResolver } from './resolver/permission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { PermissionCategory } from './entity/permission_category.entity';
import { PermissionCategoryService } from './service/permission_category.service';
import { PermissionCategoryResolver } from './resolver/permission_category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionCategory])],
  providers: [PermissionService, PermissionResolver, PaginationBuilder, PermissionCategoryService, PermissionCategoryResolver]
})
export class PermissionModule {}
