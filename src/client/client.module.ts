import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client])]
})
export class ClientModule {}
