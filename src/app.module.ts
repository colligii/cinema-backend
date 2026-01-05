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
import { MovieRoomModule } from './movie_room/movie_room.module';
import { MovieRoom } from './movie_room/entity/movie_room.entity';
import { MovieSessionModule } from './movie_session/movie_session.module';
import { MovieSession } from './movie_session/entity/movie_session.entity';
import { MovieRoomSeats } from './movie_room/entity/movie_room_seats.entity';
import { ReservedSeatsModule } from './reserved_seats/reserved_seats.module';
import { ReservedSeats } from './reserved_seats/entity/reserved_seats.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';

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
        Client,
        MovieRoom,
        MovieSession,
        MovieRoomSeats,
        ReservedSeats,
        User
      ],
      synchronize: true
    }),
    MovieModule,
    IndicativeRatingModule,
    PosterModule,
    GenresModule,
    CastModule,
    ClientModule,
    MovieRoomModule,
    MovieSessionModule,
    ReservedSeatsModule,
    UserModule
  ],
})
export class AppModule {}
