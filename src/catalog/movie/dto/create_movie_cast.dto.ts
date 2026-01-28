import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { MovieCast, MovieCastType } from "src/catalog/cast/entity/movie_cast.entity";
import { MovieHelper } from "../helper/movie.helper";

@InputType()
export class MovieCastDTO {
    @Field()
    @IsUUID(undefined, { message: MovieHelper.CastUUIDIsNotUUID })
    @IsNotEmpty({ message: MovieHelper.CastIdIsEmpty })
    cast_id: string

    @Field()
    @IsEnum(MovieCastType, { message: MovieHelper.TypeIsNotOnEnum })
    @IsNotEmpty({ message: MovieHelper.TypeIsNotEmpty })
    type: MovieCastType;
}