import { Module } from '@nestjs/common';
import { MovieCast } from './entity/movie_cast.entity';
import { Cast } from './entity/cast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastResolver } from './resolver/cast.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Cast, MovieCast])],
    providers: [CastResolver],
})
export class CastModule {}
