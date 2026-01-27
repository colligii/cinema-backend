import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { GenresHelper } from "../helper/genres.helper";

@InputType()
export class CreateGenres {
    @Field()
    @IsString({ message: GenresHelper.NameIsString })
    @IsNotEmpty({ message: GenresHelper.NameIsNotEmpty })
    name: string
}