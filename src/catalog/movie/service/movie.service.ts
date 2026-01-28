import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entity/movie.entity';
import { DataSource, QueryFailedError, EntityManager, Repository, In, Or } from 'typeorm';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { MovieHelper } from '../helper/movie.helper';
import { CreateMovie } from '../dto/create_movie.dto';
import { IndicativeRating } from 'src/catalog/indicative_rating/entity/indicative_rating.entity';
import { Genres } from 'src/catalog/genres/entity/genres.entity';
import { MovieCastDTO } from '../dto/create_movie_cast.dto';
import { MovieCast } from 'src/catalog/cast/entity/movie_cast.entity';
import { Cast } from 'src/catalog/cast/entity/cast.entity';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedMovieResponse } from '../dto/paginated_movie_response.dto';
import { UpdateMovie } from '../dto/update_movie.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
        @InjectRepository(IndicativeRating)
        private readonly indicativeRatingRepository: Repository<IndicativeRating>,
        @InjectRepository(Genres)
        private readonly genresRepository: Repository<Genres>,
        @InjectRepository(Cast)
        private readonly castRepository: Repository<Cast>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) { }

    private async saveMovie(manager: EntityManager, data: Movie) {
        try {
            return await manager.save(data);
        } catch(error) {
            if(
                error instanceof QueryFailedError &&
                error.driverError?.code === '23505'
            ) {
                throw new BadRequestException(MovieHelper.AlreadyExists)
            }

            throw error;
        }
    }

    private async getIndicativeRatingById(id: string) {
        const indicativeRating = await this.indicativeRatingRepository.findOne({
            where: { id }
        })

        if(!indicativeRating)
            throw new NotFoundException(MovieHelper.IndicativeRatingNotExists)

        return indicativeRating;
    }

    private async getGenresByIds(ids: string[]) {
        const genres = await this.genresRepository.find({
            where: { id: In(ids) }
        })

        if(genres?.length !== ids?.length)
            throw new NotFoundException(MovieHelper.GenresNotExists)
        
        return genres;
    }

    private async upsertMovieCasts(movieCastDto: MovieCastDTO[], manager: EntityManager, movie: Movie): Promise<MovieCast[]> {
        await manager.delete(MovieCast, {
            movie: { id: movie.id }
        })

        const movieCasts = await this.generateMovieCasts(movieCastDto, movie);

        manager.insert(MovieCast, movieCasts);

        return movieCasts;
    }

    private async generateMovieCasts(movieCastDto: MovieCastDTO[], movie: Movie): Promise<MovieCast[]> {
        return await Promise.all(
            movieCastDto.map(async (item) => {
                const findedCast = await this.castRepository.findOne({
                    where: { id: item.cast_id }
                });

                if(!findedCast)
                    throw new NotFoundException(MovieHelper.CastNotExists)

                return {
                    cast: findedCast,
                    movie,
                    movie_id: movie.id,
                    cast_id: findedCast.id,
                    type: item.type
                } as MovieCast;
            })
        );
    }

    private async patchUpdateIndicativeRating(oldIndicativeRating: IndicativeRating, newIndicativeRatingId?: string): Promise<IndicativeRating> {
        if(!newIndicativeRatingId || oldIndicativeRating.id === newIndicativeRatingId)
            return oldIndicativeRating;

        return this.getIndicativeRatingById(newIndicativeRatingId);
    }

    private async patchUpdateGenres(oldGenres: Genres[], newGenresIds?: string[]): Promise<Genres[]> {
        if(!newGenresIds)
            return oldGenres;

        return this.getGenresByIds(newGenresIds);    
    }

    async createMovie(body: CreateMovie): Promise<Movie> {
        return this.dataSource.transaction(async (manager) => {
            const findedMovie = await manager.findOne(Movie, {
                where: {
                    name: body.name
                },
                lock: { mode: 'pessimistic_write' }
            })

            if (findedMovie)
                throw new NotFoundException(MovieHelper.AlreadyExists)

            const createdMovie = manager.create(Movie, body);

            createdMovie.indicativeRating = await this.getIndicativeRatingById(body.indicative_rating_id);
            createdMovie.genres = await this.getGenresByIds(body.genres_id);

            const movie = await this.saveMovie(manager, createdMovie);
        
            movie.movieCast = await this.upsertMovieCasts(body.movie_cast, manager, movie);

            return movie;
        })
    }

    async getMovieById(id: string): Promise<Movie> {
        const findedMovie = await this.movieRepository.findOne({
            where: { id },
            withDeleted: true,
            relations: {
                indicativeRating: true,
                movieCast: {
                    cast: true
                },
                genres: true
            }
        })

        if (!findedMovie)
            throw new NotFoundException(MovieHelper.NotFound);

        return findedMovie;
    }

    async paginatedMovies(body: PaginatedInput): Promise<PaginatedMovieResponse> {
        const movieQueryBuilder = this.movieRepository.createQueryBuilder('movie')
            .leftJoinAndSelect('movie.indicativeRating', 'indicativeRating')
            .leftJoinAndSelect('movie.movieCast', 'movieCast')
            .leftJoinAndSelect('movieCast.cast', 'cast')
            .leftJoinAndSelect('movie.genres', 'genres')
            .withDeleted()

        return this.paginationBuilder
            .buildPaginationClass(movieQueryBuilder)
            .applyFilters(body.keyword, ['name', 'description'])
            .getPagination(body.size, body.page, 'created_at')

    }

    async updateMovies(body: UpdateMovie): Promise<Movie> {
        return this.dataSource.transaction(async (manager) => {
            const findedMovie2 = await this.getMovieById(body.id);
            const findedMovie = await manager.findOne(Movie, {
                where: {
                    id: body.id
                },
                lock: {
                    mode: 'pessimistic_write'
                },
            })

            console.log(findedMovie, findedMovie2)

            if(!findedMovie)
                throw new NotFoundException(MovieHelper.NotFound);

            findedMovie.name = body?.name ?? findedMovie.name;
            findedMovie.coverArt = body?.coverArt ?? findedMovie.coverArt;
            findedMovie.description = body?.description ?? findedMovie.description;
            findedMovie.duration = body?.duration ?? findedMovie.duration;
            findedMovie.isReleased = body?.isReleased ?? findedMovie.isReleased;
            findedMovie.trailerUrl = body?.trailerUrl ?? findedMovie.trailerUrl;

            findedMovie.indicativeRating = await this.patchUpdateIndicativeRating(findedMovie.indicativeRating, body.indicative_rating_id)
            findedMovie.genres = await this.patchUpdateGenres(findedMovie.genres, body.genres_id)
            
            console.log(findedMovie)

            const movie = await this.saveMovie(manager, findedMovie);

            if(Array.isArray(body.movie_cast))
                movie.movieCast = await this.upsertMovieCasts(body.movie_cast, manager, movie);

            return this.getMovieById(movie.id);
        })
    }

    async deleteMovie(id: string): Promise<Movie> {
        const findedMovie = await this.getMovieById(id);

        await this.movieRepository.softDelete(id);

        return this.getMovieById(id);
    }

    async restoreMovie(id: string): Promise<Movie> {
        const findedMovie = await this.getMovieById(id);
        
        findedMovie.deleted_at = undefined;

        await this.movieRepository.restore(id);

        return findedMovie;
    }
}
