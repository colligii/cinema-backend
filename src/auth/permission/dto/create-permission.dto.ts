import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { PermissionHelper } from "../helper/permission.helper";

@InputType()
export class CreatePermission {
    @Field()
    @IsString({ message: PermissionHelper.NameIsString })
    @IsNotEmpty({ message: PermissionHelper.NameIsNotEmpty })
    code: string;

    @Field()
    @IsString({ message: PermissionHelper.DescriptionIsString })
    @IsNotEmpty({ message: PermissionHelper.DescriptionIsNotEmpty })
    description: string;
}