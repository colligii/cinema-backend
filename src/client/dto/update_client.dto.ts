import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ClientHelper } from "../helper/client.helper";

@InputType()
export class UpdateClient {
    @Field()
    @IsUUID(undefined, { message: ClientHelper.IDIsUUID })
    @IsNotEmpty({ message: ClientHelper.IdIsNotEmpty })
    id: string
    
    @Field({ nullable: true })
    @IsString({ message: ClientHelper.NameIsString })
    name?: string
}