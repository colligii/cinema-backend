import { Module } from '@nestjs/common';
import { Genres } from './entity/genres.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from './service/genres.service';
import { GenresResolver } from './resolver/genres.resolver';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';

@Module({
    imports: [TypeOrmModule.forFeature([Genres])],
    providers: [GenresService, GenresResolver, PaginationBuilder],
})
export class GenresModule {}
