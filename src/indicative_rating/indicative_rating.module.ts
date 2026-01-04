import { Module } from '@nestjs/common';
import { IndicativeRating } from './entity/indicative_rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([IndicativeRating])],
})
export class IndicativeRatingModule {}
