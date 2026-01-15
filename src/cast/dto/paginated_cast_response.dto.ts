import { ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { Cast } from "../entity/cast.entity";

@ObjectType()
export class PaginatedCastResponse extends PaginationResponse(Cast) {}