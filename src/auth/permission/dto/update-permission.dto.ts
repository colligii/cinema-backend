import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { PermissionHelper } from "../helper/permission.helper";
import { PermissionCategoryHelper } from "../helper/permission_category.helper";

@InputType()
export class UpdatePermission {
    @Field()
    @IsString({ message: PermissionHelper.IdIsString })
    id: string;

    @Field({ nullable: true })
    @IsString({ message: PermissionHelper.DescriptionIsString })
    description?: string;

    @Field({ nullable: true })
    @IsUUID(undefined, { message: PermissionCategoryHelper.IsNotUUID })
    permission_category_id: string;
}