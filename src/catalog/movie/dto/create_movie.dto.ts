import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsBoolean, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { MovieCastDTO } from "./create_movie_cast.dto";
import { Type } from "class-transformer";
import { MovieHelper } from "../helper/movie.helper";

@InputType()
export class CreateMovie {
    @Field()
    @IsString({ message: MovieHelper.NameIsString })
    @IsNotEmpty({ message: MovieHelper.NameIsNotEmpty })
    name: string;
    
    @Field()
    @IsString({ message: MovieHelper.CoverArtIsString })
    @IsNotEmpty({ message: MovieHelper.CoverArtIsNotEmpty })
    coverArt: string;

    @Field()
    @IsString({ message: MovieHelper.DescriptionIsString })
    @IsNotEmpty({ message: MovieHelper.DescriptionIsNotEmpty })
    description: string;

    @Field()
    @IsNumber(undefined, { message: MovieHelper.DurationIsNotANumber })
    @IsNotEmpty({ message: MovieHelper.DescriptionIsNotEmpty })
    duration: number;

    @Field()
    @IsBoolean({ message: MovieHelper.IsReleasedNotABoolean })
    @IsNotEmpty({ message: MovieHelper.IsReleasedNotEmpty })
    isReleased: boolean;

    @Field()
    @IsString({ message: MovieHelper.TrailerUrlIsNotString })
    @IsNotEmpty({ message: MovieHelper.TrailerUrlIsEmpty })
    trailerUrl: string;

    @Field()
    @IsUUID(undefined, { message: MovieHelper.IndicativeRatingIdIsNotUUID })
    @IsNotEmpty({ message: MovieHelper.IndicativeRatingIdIsNotUUID })
    indicative_rating_id: string;

    @Field(() => [String])
    @IsUUID(undefined, { each: true, message: MovieHelper.GenresIdIsNotUUID })
    @IsNotEmpty({ message: MovieHelper.GenresIDIsEmpty })
    genres_id: string[]
    
    @Field(() => [MovieCastDTO])
    @IsArray({ message: MovieHelper.MovieCastIsNotAnArray })
    @ValidateNested({ each: true })
    @Type(() => MovieCastDTO)
    movie_cast: MovieCastDTO[];
}