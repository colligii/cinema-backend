import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRoom } from './entity/movie_room.entity';
import { MovieRoomSeats } from './entity/movie_room_seats.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MovieRoom, MovieRoomSeats])]
})
export class MovieRoomModule {}
