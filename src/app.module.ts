import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import 'dotenv/config'
import { Movie } from './movie/entity/movie.entity';
import { IndicativeRatingModule } from './indicative_rating/indicative_rating.module';
import { IndicativeRating } from './indicative_rating/entity/indicative_rating.entity';
import { PosterModule } from './poster/poster.module';
import { Poster } from './poster/entity/poster.entity';
import { GenresModule } from './genres/genres.module';
import { Genres } from './genres/entity/genres.entity';
import { CastModule } from './cast/cast.module';
import { MovieCast } from './cast/entity/movie_cast.entity';
import { Cast } from './cast/entity/cast.entity';
import { ClientModule } from './client/client.module';
import { Client } from './client/entity/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATA,
      entities: [
        Movie,
        IndicativeRating,
        Poster,
        Genres,
        MovieCast,
        Cast,
        Client
      ],
      synchronize: true
    }),
    MovieModule,
    IndicativeRatingModule,
    PosterModule,
    GenresModule,
    CastModule,
    ClientModule
  ],
})
export class AppModule {}
