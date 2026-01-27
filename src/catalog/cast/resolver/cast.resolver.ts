import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CastService } from '../service/cast.service';
import { Cast } from '../entity/cast.entity';
import { CreateCast } from '../dto/create_cast.dto';
import { PaginatedCastResponse } from '../dto/paginated_cast_response.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { UpdateCast } from '../dto/update_cast.dto';

@Resolver()
export class CastResolver {

    constructor(
        private readonly castService: CastService
    ) {}

    @Mutation(() => Cast)
    async createCast(
        @Args('body') body: CreateCast
    ): Promise<Cast> {
        return this.castService.createCast(body)
    }

    @Query(() => Cast)
    async getCastById(
        @Args("id") id: string
    ): Promise<Cast> {
        return this.castService.getCastById(id);
    }

    @Query(() => PaginatedCastResponse)
    async paginatedCast(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedCastResponse> {
        return this.castService.paginatedCast(body)
    }

    @Mutation(() => Cast)
    async updateCast(
        @Args('body') body: UpdateCast
    ): Promise<Cast> {
        return this.castService.updateCast(body);
    }

    @Mutation(() => Cast)
    async deleteCast(
        @Args('id') id: string
    ): Promise<Cast> {
        return this.castService.deleteCast(id);
    }

}
