import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { UserResponse } from '../dto/user_response.dto';
import { CreateUser } from '../dto/create_user.dto';
import { PaginatedUserResponse } from '../dto/paginated_user_response.dto';
import { PaginatedInput } from 'src/utils/pagination/dto/paginated_input';
import { UpdateUser } from '../dto/update_user.dto';

@Resolver()
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ) {}

    @Mutation(() => UserResponse)
    async createUser(
        @Args('body') body: CreateUser
    ): Promise<UserResponse> {
        return this.userService.createUser(body)
    }

    @Query(() => UserResponse)
    async getUserById(
        @Args("id") id: string
    ): Promise<UserResponse> {
        return this.userService.getUserById(id);
    }

    @Query(() => PaginatedUserResponse)
    async paginatedUsers(
        @Args('body') body: PaginatedInput
    ): Promise<PaginatedUserResponse> {
        return this.userService.paginatedUsers(body)
    }

    @Mutation(() => UserResponse)
    async updateUser(
        @Args('body') body: UpdateUser
    ): Promise<UserResponse> {
        return this.userService.updateUser(body);
    }

    @Mutation(() => UserResponse)
    async deleteUser(
        @Args('id') id: string
    ): Promise<UserResponse> {
        return this.userService.deleteUser(id);
    }

}
