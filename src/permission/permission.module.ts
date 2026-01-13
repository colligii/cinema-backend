import { Module } from '@nestjs/common';
import { PermissionService } from './service/permission.service';
import { PermissionResolver } from './resolver/permission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService, PermissionResolver, PaginationBuilder]
})
export class PermissionModule {}
