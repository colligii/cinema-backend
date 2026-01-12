import { Injectable } from "@nestjs/common";
import Pagination from "..";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class PaginationBuilder {

    buildPaginationClass<T extends object>(queryBuilder: SelectQueryBuilder<T>) {
        return new Pagination(queryBuilder)
    }

}

