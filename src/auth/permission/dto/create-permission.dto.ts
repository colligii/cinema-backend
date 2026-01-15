import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PermissionHelper } from "../helper/permission.helper";
import { PermissionCategoryHelper } from "../helper/permission_category.helper";

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

    @Field()
    @IsUUID(undefined, { message: PermissionCategoryHelper.IsNotUUID })
    @IsNotEmpty({ message: PermissionCategoryHelper.IsNotEmpty })
    permission_category_id: string;
}