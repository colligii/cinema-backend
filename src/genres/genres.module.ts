import { Module } from '@nestjs/common';
import { Genres } from './entity/genres.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Genres])],
})
export class GenresModule {}
