import { ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { Role } from "../entity/role.entity";

@ObjectType()
export class PaginatedRoleResponse extends PaginationResponse(Role) {}