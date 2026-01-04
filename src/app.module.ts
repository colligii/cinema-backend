import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import 'dotenv/config'
import { Movie } from './movie/entity/movie.entity';
import { IndicativeRatingModule } from './indicative_rating/indicative_rating.module';
import { IndicativeRating } from './indicative_rating/entity/indicative_rating.entity';
import { PosterModule } from './poster/poster.module';
import { Poster } from './poster/entity/poster.entity';

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
        Poster
      ],
      synchronize: true
    }),
    MovieModule,
    IndicativeRatingModule,
    PosterModule
  ],
})
export class AppModule {}
