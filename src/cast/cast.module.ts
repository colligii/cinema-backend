import { Module } from '@nestjs/common';
import { MovieCast } from './entity/movie_cast.entity';
import { Cast } from './entity/cast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Cast, MovieCast])],
})
export class CastModule {}
