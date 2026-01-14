import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserResponse {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    created_at: Date;
}