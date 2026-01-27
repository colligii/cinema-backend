import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IndicativeRatingService } from '../service/indicative_rating.service';
import { CreateIndicativeRating } from '../dto/create_indicative_rating.dto';
import { IndicativeRating } from '../entity/indicative_rating.entity';
import { UpdateIndicativeRating } from '../dto/update_indicative_rating.dto';

@Resolver()
export class IndicativeRatingResolver {
    
    constructor(
        private indicativeRatingService: IndicativeRatingService
    ) {}

    @Mutation(() => IndicativeRating)
    async createIndicativeRating(
        @Args('body') body: CreateIndicativeRating
    ): Promise<IndicativeRating> {
        return this.indicativeRatingService.createIndicativeRating(body);
    }

    @Mutation(() => IndicativeRating)
    async updateIndicativeRating(
        @Args('body') body: UpdateIndicativeRating
    ): Promise<IndicativeRating> {
        return this.indicativeRatingService.updateIndicativeRating(body);
    }

    @Query(() => [IndicativeRating])
    async listIndicativeRating(): Promise<IndicativeRating[]> {
        return this.indicativeRatingService.listIndicativeRating();
    }

    @Query(() => IndicativeRating)
    async findIndicativeRatingById(
        @Args('id') id: string
    ): Promise<IndicativeRating> {
        return this.indicativeRatingService.findIndicativeRatingById(id);
    }
}
