import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { CastHelper } from "../helper/cast.helper";

@InputType()
export class UpdateCast {
    @Field()
    @IsUUID(undefined, { message: CastHelper.IdIsNotUUID })
    @IsNotEmpty({ message: CastHelper.IDIsNotEmpty })
    id: string;

    @Field({ nullable: true })
    @IsString({ message: CastHelper.NameIsString })
    name: string;

    @Field({ nullable: true })
    @IsString({ message: CastHelper.LastNameIsString })
    last_name: string;
}