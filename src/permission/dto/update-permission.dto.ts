import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { PermissionHelper } from "../helper/permission.helper";

@InputType()
export class UpdatePermission {
    @Field()
    @IsString({ message: PermissionHelper.IdIsString })
    id: string;

    @Field({ nullable: true })
    @IsString({ message: PermissionHelper.DescriptionIsString })
    description?: string;
}