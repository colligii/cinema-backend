import { ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { Client } from "../entity/client.entity";

@ObjectType()
export class PaginatedClientResponse extends PaginationResponse(Client) {}