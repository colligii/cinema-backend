import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './catalog/movie/movie.module';
import 'dotenv/config'
import { Movie } from './catalog/movie/entity/movie.entity';
import { IndicativeRatingModule } from './catalog/indicative_rating/indicative_rating.module';
import { IndicativeRating } from './catalog/indicative_rating/entity/indicative_rating.entity';
import { PosterModule } from './poster/poster.module';
import { Poster } from './poster/entity/poster.entity';
import { GenresModule } from './catalog/genres/genres.module';
import { Genres } from './catalog/genres/entity/genres.entity';
import { CastModule } from './catalog/cast/cast.module';
import { MovieCast } from './catalog/cast/entity/movie_cast.entity';
import { Cast } from './catalog/cast/entity/cast.entity';
import { ClientModule } from './client/client.module';
import { Client } from './client/entity/client.entity';
import { MovieRoomModule } from './movie_room/movie_room.module';
import { MovieRoom } from './movie_room/entity/movie_room.entity';
import { MovieSessionModule } from './movie_session/movie_session.module';
import { MovieSession } from './movie_session/entity/movie_session.entity';
import { MovieRoomSeats } from './movie_room/entity/movie_room_seats.entity';
import { ReservedSeatsModule } from './reserved_seats/reserved_seats.module';
import { ReservedSeats } from './reserved_seats/entity/reserved_seats.entity';
import { User } from './auth/user/entity/user.entity';
import { Role } from './auth/role/entity/role.entity';
import { SessionModule } from './auth/session/session.module';
import { Session } from './auth/session/entity/session.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { Permission } from './auth/permission/entity/permission.entity';
import { PermissionCategory } from './auth/permission/entity/permission_category.entity';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
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
        User,
        Permission,
        Role,
        Session,
        PermissionCategory
      ],
      synchronize: false
    }),
    PosterModule,
    ClientModule,
    MovieRoomModule,
    MovieSessionModule,
    ReservedSeatsModule,
    AuthModule,
    CatalogModule
  ]
})
export class AppModule {}
