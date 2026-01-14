import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { RoleResolver } from './resolver/role.resolver';
import { RoleService } from './service/role.service';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { Permission } from '../permission/entity/permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission])],
    providers: [RoleResolver, RoleService, PaginationBuilder]
})
export class RoleModule {}
