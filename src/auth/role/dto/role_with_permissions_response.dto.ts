import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "../entity/role.entity";
import { Permission } from "src/auth/permission/entity/permission.entity";

@ObjectType()
export class RoleWithPermissionsResponse extends Role {
    @Field(() => [Permission])
    declare permission: Permission[];
}