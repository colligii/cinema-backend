import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genres } from '../entity/genres.entity';
import { DataSource, QueryFailedError, EntityManager, Repository } from 'typeorm';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { GenresHelper } from '../helper/genres.helper';
import { CreateGenres } from '../dto/create_genres.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedGenresResponse } from '../dto/paginated_genres_response.dto';
import { UpdateGenres } from '../dto/update_genres.dto';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genres)
        private readonly genresRepository: Repository<Genres>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) { }

    private async saveGenre(manager: EntityManager, data: Genres) {
        try {
            return await manager.save(data);
        } catch(error) {
            if(
                error instanceof QueryFailedError &&
                error.driverError?.code === '23505'
            ) {
                throw new BadRequestException(GenresHelper.AlreadyExists)
            }

            throw error;
        }
    }

    async createGenres(body: CreateGenres): Promise<Genres> {
        return this.dataSource.transaction(async (manager) => {
            const findedGenres = await manager.findOne(Genres, {
                where: {
                    name: body.name
                },
                lock: { mode: 'pessimistic_write' }
            })

            if (findedGenres)
                throw new NotFoundException(GenresHelper.AlreadyExists)

            const createdGenres = this.genresRepository.create(body);

            return this.saveGenre(manager, createdGenres);
        })
    }

    async getGenresById(id: string): Promise<Genres> {
        const findedGenres = await this.genresRepository.findOne({
            where: { id },
            withDeleted: true
        })

        if (!findedGenres)
            throw new NotFoundException(GenresHelper.NotFound);

        return findedGenres;
    }

    async paginatedGenres(body: PaginatedInput): Promise<PaginatedGenresResponse> {
        const genresQueryBuilder = this.genresRepository.createQueryBuilder('genres')
            .withDeleted()

        return this.paginationBuilder
            .buildPaginationClass(genresQueryBuilder)
            .applyFilters(body.keyword, ['name'])
            .getPagination(body.size, body.page, 'created_at')

    }

    async updateGenres(body: UpdateGenres): Promise<Genres> {
        return this.dataSource.transaction(async (manager) => {
            const findedGenres = await manager.findOne(Genres, {
                where: {
                    id: body.id
                },
                lock: {
                    mode: 'pessimistic_write'
                },
            })

            if(!findedGenres)
                throw new NotFoundException(GenresHelper.NotFound);

            findedGenres.name = body?.name ?? findedGenres.name;

            return this.saveGenre(manager, findedGenres);
        })
    }
    
    async deleteGenres(id: string): Promise<Genres> {
        const findedGenres = await this.genresRepository.findOne({
            where: {
                id
            },
            relations: [
                'movies'
            ]
        })

        if(!findedGenres)
            throw new NotFoundException(GenresHelper.NotFound);

        if(findedGenres.movies?.length)
            throw new BadRequestException(GenresHelper.HaveMoviesAssociated)

        await this.genresRepository.delete(id);

        return findedGenres;
    }
}
