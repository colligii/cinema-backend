import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndicativeRating } from '../entity/indicative_rating.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateIndicativeRating } from '../dto/create_indicative_rating.dto';
import { IndicativeRatingHelper } from '../helper/indicative_rating.helper';
import { UpdateIndicativeRating } from '../dto/update_indicative_rating.dto';

@Injectable()
export class IndicativeRatingService {
    constructor(
        @InjectRepository(IndicativeRating)
        private readonly indicativeRatingRepository: Repository<IndicativeRating>,
        private readonly dataSource: DataSource
    ) {}

    async createIndicativeRating(body: CreateIndicativeRating): Promise<IndicativeRating> {
        return this.dataSource.transaction(async (manager) => {
            const indicativeRating = await manager.findOne(IndicativeRating, 
                { 
                    where: {
                        code: body.code
                    },
                    lock: { mode: 'pessimistic_write'}
                }
            )

            if(indicativeRating)
                throw new BadRequestException(IndicativeRatingHelper.IndicativeRatingAlreadyExists);

            const newIndicativeRating = manager.create(IndicativeRating, body);
            return manager.save(newIndicativeRating)
        })
    }

    async listIndicativeRating(): Promise<IndicativeRating[]> {
        return this.indicativeRatingRepository.find();
    }

    async findIndicativeRatingById(id: string): Promise<IndicativeRating> {
        const indicativeRating = await this.indicativeRatingRepository.findOne({
            where: { id }
        })

        if(!indicativeRating)
            throw new NotFoundException(IndicativeRatingHelper.NotFoundExceptionById)

        return indicativeRating;
    }

    async updateIndicativeRating(body: UpdateIndicativeRating) {
        return this.dataSource.transaction(async (manager) => {
            const indicativeRating = await manager.findOne(IndicativeRating, {
                where: { id: body.id },
                lock: { mode: 'pessimistic_write' }
            })

            if(!indicativeRating)
                throw new NotFoundException(IndicativeRatingHelper.NotFoundExceptionById);

            indicativeRating.code = body?.code ?? indicativeRating.code;
            indicativeRating.minAge = body?.minAge ?? indicativeRating.minAge;

            return manager.save(indicativeRating)
        })
    }
}
