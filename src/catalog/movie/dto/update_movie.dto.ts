import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { MovieCastDTO } from "./create_movie_cast.dto";
import { Type } from "class-transformer";
import { MovieHelper } from "../helper/movie.helper";

@InputType()
export class UpdateMovie {
    @Field()
    @IsUUID(undefined, { message: MovieHelper.IdIsNotUUID })
    @IsNotEmpty({ message: MovieHelper.IdIsNotEmpty })
    id: string;

    @Field({ nullable: true })
    @IsString({ message: MovieHelper.NameIsString })
    name?: string;
    
    @Field({ nullable: true })
    @IsString({ message: MovieHelper.CoverArtIsString })
    coverArt?: string;

    @Field({ nullable: true })
    @IsString({ message: MovieHelper.DescriptionIsString })
    description?: string;

    @Field({ nullable: true })
    @IsNumber(undefined, { message: MovieHelper.DurationIsNotANumber })
    duration?: number;

    @Field({ nullable: true })
    @IsBoolean({ message: MovieHelper.IsReleasedNotABoolean })
    isReleased?: boolean;

    @Field({ nullable: true })
    @IsString({ message: MovieHelper.TrailerUrlIsNotString })
    trailerUrl?: string;

    @Field({ nullable: true })
    @IsUUID(undefined, { message: MovieHelper.IndicativeRatingIdIsNotUUID })
    indicative_rating_id?: string;

    @Field(() => [String], { nullable: true })
    @IsUUID(undefined, { each: true, message: MovieHelper.GenresIdIsNotUUID })
    genres_id?: string[]
    
    @Field(() => [MovieCastDTO], { nullable: true })
    @IsOptional()
    @IsArray({ message: MovieHelper.MovieCastIsNotAnArray })
    @ValidateNested({ each: true })
    @Type(() => MovieCastDTO)
    movie_cast?: MovieCastDTO[];
}