import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission/entity/permission.entity';
import { Role } from './role/entity/role.entity';
import { Session } from './session/entity/session.entity';
import { User } from './user/entity/user.entity';

@Module({
    imports: [
        UserModule,
        SessionModule,
        PermissionModule,
        RoleModule
    ]
})
export class AuthModule {}
