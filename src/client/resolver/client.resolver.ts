import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { ClientService } from '../service/client.service';
import { Client } from '../entity/client.entity';
import { CreateClient } from '../dto/create_client.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { PaginatedClientResponse } from '../dto/paginated_client_response.dto';
import { UpdateClient } from '../dto/update_client.dto';
import { UpdateClientAdmin } from '../dto/update_client_admin.dto';

@Resolver()
export class ClientResolver {
    constructor(
        private readonly clientService: ClientService
    ) {}

    @Mutation(() => Client)
    async createClient(
        @Args('body') body: CreateClient
    ): Promise<Client> {
        return this.clientService.craeteClient(body)
    }

    @Query(() => Client)
    async getClientById(
        @Args("id") id: string
    ): Promise<Client> {
        return this.clientService.getClientById(id);
    }

    @Query(() => PaginatedClientResponse)
    async paginatedClient(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedClientResponse> {
        return this.clientService.paginatedClient(body)
    }

    @Mutation(() => Client)
    async updateClient(
        @Args('body') body: UpdateClient
    ): Promise<Client> {
        return this.clientService.updateClient(body);
    }

    @Mutation(() => Client)
    async updateClientAdmin(
        @Args('body') body: UpdateClientAdmin
    ): Promise<Client> {
        return this.clientService.updateClientAdmin(body);
    }

    @Mutation(() => Client)
    async deleteClient(
        @Args('id') id: string
    ): Promise<Client> {
        return this.clientService.deleteClient(id);
    }

    @Mutation(() => Client)
    async restoreClient(
        @Args('id') id: string
    ): Promise<Client> {
        return this.clientService.restoreClient(id);
    }

}
