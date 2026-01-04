import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSession } from './entity/movie_session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MovieSession])]
})
export class MovieSessionModule {}
