import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '../service/genres.service';
import { CreateGenres } from '../dto/create_genres.dto';
import { Genres } from '../entity/genres.entity';
import { PaginatedGenresResponse } from '../dto/paginated_genres_response.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { UpdateGenres } from '../dto/update_genres.dto';

@Resolver()
export class GenresResolver {
    constructor(
        private readonly genresService: GenresService
    ) {}

    @Mutation(() => Genres)
    async createGenres(
        @Args('body') body: CreateGenres
    ): Promise<Genres> {
        return this.genresService.createGenres(body)
    }

    @Query(() => Genres)
    async getGenresById(
        @Args("id") id: string
    ): Promise<Genres> {
        return this.genresService.getGenresById(id);
    }

    @Query(() => PaginatedGenresResponse)
    async paginatedGenres(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedGenresResponse> {
        return this.genresService.paginatedGenres(body)
    }

    @Mutation(() => Genres)
    async updateGenres(
        @Args('body') body: UpdateGenres
    ): Promise<Genres> {
        return this.genresService.updateGenres(body);
    }

    @Mutation(() => Genres)
    async deleteGenres(
        @Args('id') id: string
    ): Promise<Genres> {
        return this.genresService.deleteGenres(id);
    }
}
