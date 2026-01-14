import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { RoleHelper } from "../helper/role.helper";

@InputType()
export class UpdateRole {
    @Field()
    @IsUUID(undefined, { message: RoleHelper.IDIsUUID })
    @IsNotEmpty({ message: RoleHelper.IDIsNotEmpty })
    id: string;

    @Field({ nullable: true })
    @IsString({ message: RoleHelper.NameIsNotString })
    name: string;
}