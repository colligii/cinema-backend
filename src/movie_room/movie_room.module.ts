import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRoom } from './entity/movie_room.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MovieRoom])]
})
export class MovieRoomModule {}
