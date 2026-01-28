import { ObjectType } from "@nestjs/graphql";
import { PaginationResponse } from "src/utils/pagination/dto/pagination_response";
import { Movie } from "../entity/movie.entity";

@ObjectType()
export class PaginatedMovieResponse extends PaginationResponse(Movie) {}