import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { CastHelper } from "../helper/cast.helper";

@InputType()
export class CreateCast {
    @Field()
    @IsString({ message: CastHelper.NameIsString })
    @IsNotEmpty({ message: CastHelper.NameIsNotEmpty })
    name: string;

    @Field()
    @IsString({ message: CastHelper.LastNameIsString })
    @IsNotEmpty({ message: CastHelper.LastNameIsNotEmpty })
    last_name: string;
}