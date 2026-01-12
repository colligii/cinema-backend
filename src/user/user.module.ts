import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserResolver, PaginationBuilder]
})
export class UserModule {}
