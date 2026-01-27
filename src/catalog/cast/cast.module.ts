import { Module } from '@nestjs/common';
import { MovieCast } from './entity/movie_cast.entity';
import { Cast } from './entity/cast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastResolver } from './resolver/cast.resolver';
import { CastService } from './service/cast.service';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cast, MovieCast])],
    providers: [CastResolver, CastService, PaginationBuilder],
})
export class CastModule {}
