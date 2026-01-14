import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { Permission } from "../entity/permission.entity";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginatedPermissionResponse extends PaginationResponse(Permission) {}