import { Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import PaginationResponseImp from "../interface/pagination_response";

export function PaginationResponse<T>(ItemType: Type<T>) {
    @ObjectType({ isAbstract: true })
    abstract class PaginationResponseClass implements PaginationResponseImp<T> {
        @Field()
        size: number;
    
        @Field()
        page: number;

        @Field()
        previous: boolean;

        @Field()
        next: boolean;
    
        @Field(() => [ItemType])
        items: T[];
    }

    return PaginationResponseClass
}

