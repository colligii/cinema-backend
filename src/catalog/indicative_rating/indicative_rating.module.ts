import { Module } from '@nestjs/common';
import { IndicativeRating } from './entity/indicative_rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicativeRatingResolver } from './resolver/indicative_rating.resolver';
import { IndicativeRatingService } from './service/indicative_rating.service';

@Module({
    imports: [TypeOrmModule.forFeature([IndicativeRating])],
    providers: [IndicativeRatingResolver, IndicativeRatingService],
})
export class IndicativeRatingModule {}
