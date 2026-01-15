import { Field, ObjectType } from "@nestjs/graphql";
import { Permission } from "../entity/permission.entity";
import { PermissionCategory } from "../entity/permission_category.entity";

@ObjectType()
export class PermissionWithCategoryResponse extends Permission {
    @Field()
    declare permission_category: PermissionCategory;
}