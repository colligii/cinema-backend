import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ClientHelper } from "../helper/client.helper";
import { UpdateClient } from "./update_client.dto";

@InputType()
export class UpdateClientAdmin extends UpdateClient {
    @Field({ nullable: true })
    @IsEmail(undefined, { message: ClientHelper.IsNotEmail })
    email?: string
    
    @Field({ nullable: true })
    @IsString({ message: ClientHelper.DocumentIsNotString })
    document?: string
}