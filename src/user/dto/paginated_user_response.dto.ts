import { ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { User } from "../entity/user.entity";

@ObjectType()
export class PaginatedUserResponse extends PaginationResponse(User) {}