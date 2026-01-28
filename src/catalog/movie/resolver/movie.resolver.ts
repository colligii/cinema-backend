import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from '../service/movie.service';
import { Movie } from '../entity/movie.entity';
import { CreateMovie } from '../dto/create_movie.dto';
import { PaginatedMovieResponse } from '../dto/paginated_movie_response.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { UpdateMovie } from '../dto/update_movie.dto';

@Resolver()
export class MovieResolver {
    constructor(
        private readonly movieService: MovieService
    ) {}

    @Mutation(() => Movie)
    async createMovie(
        @Args('body') body: CreateMovie
    ): Promise<Movie> {
        return this.movieService.createMovie(body)
    }

    @Query(() => Movie)
    async getMovieById(
        @Args("id") id: string
    ): Promise<Movie> {
        return this.movieService.getMovieById(id);
    }

    @Query(() => PaginatedMovieResponse)
    async paginatedMovie(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedMovieResponse> {
        return this.movieService.paginatedMovies(body)
    }s

    @Mutation(() => Movie)
    async updateMovie(
        @Args('body') body: UpdateMovie
    ): Promise<Movie> {
        return this.movieService.updateMovies(body);
    }

    @Mutation(() => Movie)
    async deleteMovie(
        @Args('id') id: string
    ): Promise<Movie> {
        return this.movieService.deleteMovie(id);
    }

    @Mutation(() => Movie)
    async restoreMovie(
        @Args('id') id: string
    ): Promise<Movie> {
        return this.movieService.restoreMovie(id);
    }
}
