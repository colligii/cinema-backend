import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservedSeats } from './entity/reserved_seats.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservedSeats])]
})
export class ReservedSeatsModule {}
