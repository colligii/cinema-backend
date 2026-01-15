import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from '../entity/cast.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { CreateCast } from '../dto/create_cast.dto';
import { CastHelper } from '../helper/cast.helper';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedCastResponse } from '../dto/paginated_cast_response.dto';
import { UpdateCast } from '../dto/update_cast.dto';

@Injectable()
export class CastService {
    constructor(
        @InjectRepository(Cast)
        private readonly castRepository: Repository<Cast>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) { }

    async createCast(body: CreateCast): Promise<Cast> {
        return this.dataSource.transaction(async (manager) => {
            const findedCast = await manager.findOne(Cast, {
                where: { name: body.name, last_name: body.last_name },
                lock: { mode: 'pessimistic_write' }
            })

            if (findedCast)
                throw new NotFoundException(CastHelper.CastAlreadyExists)

            const createdCast = this.castRepository.create(body);

            return manager.save(createdCast);
        })
    }

    async getCastById(id: string): Promise<Cast> {
        const findedCast = await this.castRepository.findOne({
            where: { id }
        })

        if (!findedCast)
            throw new NotFoundException(CastHelper.NotFound);

        return findedCast;
    }

    async paginatedCast(body: PaginatedInput): Promise<PaginatedCastResponse> {
        const castQueryBuilder = this.castRepository.createQueryBuilder('cast')

        return this.paginationBuilder
            .buildPaginationClass(castQueryBuilder)
            .applyFilters(body.keyword, ['name', 'last_name'])
            .getPagination(body.size, body.page, 'created_at')

    }

    async updateCast(body: UpdateCast): Promise<Cast> {
        return this.dataSource.transaction(async (manager) => {
            const findedCast = await manager.findOne(Cast, {
                where: {
                    id: body.id
                },
                lock: {
                    mode: 'pessimistic_write'
                }
            })

            if(!findedCast)
                throw new NotFoundException(CastHelper.NotFound);

            findedCast.name = body.name ?? findedCast.name;
            findedCast.last_name = body.last_name ?? findedCast.last_name;
            
            return manager.save(findedCast);
        })
    }

    async deleteCast(id: string): Promise<Cast> {
        const findedCast = await this.castRepository.findOne({
            where: {
                id
            }
        })

        if(!findedCast)
            throw new NotFoundException(CastHelper.NotFound);

        await this.castRepository.delete(id);

        return findedCast;
    }

}
