import { ObjectType } from "@nestjs/graphql";
import { PaginatedInput } from "src/utils/pagination/dto/paginated_input";
import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { Genres } from "../entity/genres.entity";

@ObjectType()
export class PaginatedGenresResponse extends PaginationResponse(Genres) {}