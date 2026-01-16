import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entity/client.entity';
import { DataSource, EntityManager, FindOptionsWhere, Not, QueryFailedError, Repository } from 'typeorm';
import { PaginationBuilder } from 'src/utils/pagination/service/pagination_builder.service';
import { CreateClient } from '../dto/create_client.dto';
import { ClientHelper } from '../helper/client.helper';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedClientResponse } from '../dto/paginated_client_response.dto';
import { UpdateClientAdmin } from '../dto/update_client_admin.dto';
import { UpdateClient } from '../dto/update_client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        private readonly dataSource: DataSource,
        private readonly paginationBuilder: PaginationBuilder
    ) { }

    private async saveUser(manager: EntityManager, data: Client) {
        try {
            return await manager.save(data);
        } catch(error) {
            if(
                error instanceof QueryFailedError &&
                error.driverError?.code === '23505'
            ) {
                throw new BadRequestException(ClientHelper.AlreadyExists)
            }

            throw error;
        }
    }

    async craeteClient(body: CreateClient): Promise<Client> {
        return this.dataSource.transaction(async (manager) => {
            const findedClient = await manager.findOne(Client, {
                where: [
                    { email: body.email },
                    { document: body.document }
                ],
                lock: { mode: 'pessimistic_write' }
            })

            if (findedClient)
                throw new NotFoundException(ClientHelper.AlreadyExists)

            const createdClient = this.clientRepository.create(body);

            return this.saveUser(manager, createdClient);
        })
    }

    async getClientById(id: string): Promise<Client> {
        const findedClient = await this.clientRepository.findOne({
            where: { id }
        })

        if (!findedClient)
            throw new NotFoundException(ClientHelper.NotFound);

        return findedClient;
    }

    async paginatedClient(body: PaginatedInput): Promise<PaginatedClientResponse> {
        const clientQueryBuilder = this.clientRepository.createQueryBuilder('client')

        return this.paginationBuilder
            .buildPaginationClass(clientQueryBuilder)
            .applyFilters(body.keyword, ['name', 'email', 'document'])
            .getPagination(body.size, body.page, 'created_at')

    }

    async updateClient(body: UpdateClient): Promise<Client> {
        return this.dataSource.transaction(async (manager) => {
            const findedClient = await manager.findOne(Client, {
                where: {
                    id: body.id
                },
                lock: {
                    mode: 'pessimistic_write'
                }
            })

            if(!findedClient)
                throw new NotFoundException(ClientHelper.NotFound);

            findedClient.name = body?.name ?? findedClient.name;

            return this.saveUser(manager, findedClient);
        })
    }

    async updateClientAdmin(body: UpdateClientAdmin) {
        return this.dataSource.transaction(async (manager) => {
            const findedClient = await manager.findOne(Client, {
                where: {
                    id: body.id
                },
                lock: {
                    mode: 'pessimistic_write'
                }
            })

            if(!findedClient)
                throw new NotFoundException(ClientHelper.NotFound);

            findedClient.name = body?.name ?? findedClient.name;
            findedClient.email = body?.email ?? findedClient.email;
            findedClient.document = body.document ?? findedClient.document;

            return this.saveUser(manager, findedClient);
        })
    }

    async deleteClient(id: string): Promise<Client> {
        const findedClient = await this.clientRepository.findOne({
            where: {
                id
            }
        })

        if(!findedClient)
            throw new NotFoundException(ClientHelper.NotFound);

        await this.clientRepository.softDelete(id);

        return findedClient;
    }

}
