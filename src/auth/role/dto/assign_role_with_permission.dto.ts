import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { RoleHelper } from "../helper/role.helper";

@InputType()
export class AssignRoleWithPermission {
    @Field()
    @IsUUID(undefined, { message: RoleHelper.RoleIDIsUUID })
    @IsNotEmpty({ message: RoleHelper.RoleIDIsNotEmpty })
    roleId: string;

    @Field(() => [String])
    @IsArray({ message: RoleHelper.PermissionIdsIsNotArray })
    @IsUUID(undefined, { each: true, message: RoleHelper.PermissionIdsIsUUID })
    @IsNotEmpty({ message: RoleHelper.PermissionIdsIsNotEmpty })
    permissionIds: string[]
}