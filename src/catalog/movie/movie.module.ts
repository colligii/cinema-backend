import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { MovieService } from './service/movie.service';
import { MovieResolver } from './resolver/movie.resolver';
import { Genres } from '../genres/entity/genres.entity';
import { IndicativeRating } from '../indicative_rating/entity/indicative_rating.entity';
import { MovieCast } from '../cast/entity/movie_cast.entity';
import Pagination from 'src/utils/pagination';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { Cast } from '../cast/entity/cast.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie, Genres, IndicativeRating, MovieCast, Cast])],
    providers: [MovieService, MovieResolver, PaginationBuilder],
})
export class MovieModule {}
