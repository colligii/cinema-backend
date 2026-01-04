import { Module } from '@nestjs/common';
import { Poster } from './entity/poster.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Poster])],
})
export class PosterModule {}
