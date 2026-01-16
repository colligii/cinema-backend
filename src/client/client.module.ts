import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { ClientService } from './service/client.service';
import { ClientResolver } from './resolver/client.resolver';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientService, ClientResolver, PaginationBuilder]
})
export class ClientModule {}
