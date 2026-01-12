import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginatedInput {
    @Field()
    size: number;
    
    @Field()
    page: number;

    @Field({ nullable: true })
    keyword?: string;
}