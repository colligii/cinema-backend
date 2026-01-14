import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

@InputType()
export class AssignRoleWithPermission {
    @Field()
    @IsUUID()
    @IsNotEmpty()
    roleId: string;

    @Field(() => [String])
    @IsArray()
    @IsUUID(undefined, { each: true })
    @IsNotEmpty()
    permissionIds: string[]
}