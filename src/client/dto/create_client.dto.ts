import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ClientHelper } from "../helper/client.helper";

@InputType()
export class CreateClient {
    @Field()
    @IsString({ message: ClientHelper.NameIsString })
    @IsNotEmpty({ message: ClientHelper.NameIsNotEmpty })
    name: string

    @Field()
    @IsEmail(undefined, { message: ClientHelper.IsNotEmail })
    @IsNotEmpty({ message: ClientHelper.EmailNotEmpty })
    email: string

    @Field()
    @IsString({ message: ClientHelper.DocumentIsNotString })
    @IsNotEmpty({ message: ClientHelper.DocumentIsNotEmpty })
    document: string
}