import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { GenresHelper } from "../helper/genres.helper";

@InputType()
export class UpdateGenres {
    @Field()
    @IsUUID(undefined, { message: GenresHelper.IDIsUUID })
    @IsNotEmpty({ message: GenresHelper.IdIsNotEmpty })
    id: string;
 
    @Field({ nullable: true })
    @IsString({ message: GenresHelper.NameIsString })
    name: string
}