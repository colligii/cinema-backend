import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { RoleHelper } from "../helper/role.helper";

@InputType()
export class CreateRole {
    @Field()
    @IsString({ message: RoleHelper.NameIsNotString })
    @IsNotEmpty({ message: RoleHelper.NameIsNotEmpty })
    name: string;
}