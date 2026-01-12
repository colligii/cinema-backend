import { SelectQueryBuilder } from "typeorm";
import { PaginationResponse } from "./dto/pagination_response";
import PaginationResponseImp from "./interface/pagination_response";

export default class Pagination<T extends object> {
    private readonly alias!: string;

    constructor(
        private queryBuilder: SelectQueryBuilder<T>
    ) {
        this.alias = this.queryBuilder.alias;
    }
    
    private buildWhereString(filterFieldsKey: string[]) {
        return filterFieldsKey.map((key) => {
            return `${this.alias}.${key} ilike :filter`
        }).join(' OR ')
    }

    private filterByKeyword(keyword?: string, filterFieldsKey?: string[]) {
        if(keyword && filterFieldsKey?.length)
            this.queryBuilder
                .andWhere(
                    this.buildWhereString(filterFieldsKey),
                    {
                        filter: `%${keyword}%`
                    }
                )
    }

    applyFilters(keyword?: string, filterFieldsKey?: string[]): Pagination<T> {
        this.filterByKeyword(keyword, filterFieldsKey);
        return this;
    }

    async getPagination(limit: number = 10, page: number = 0, orderBy: string): Promise<PaginationResponseImp<T>> {
        const clonedQueryBuilder = this.queryBuilder.clone();
        const qttItemsTotal = await clonedQueryBuilder.getCount();
        
        const calculatedStartIndex = (page - 1) * limit;
        const lastPositionShowed = calculatedStartIndex + limit;

        return {
            size: limit,
            page,
            previous: page > 1,
            next: qttItemsTotal > lastPositionShowed,
            items: await this.queryBuilder
                .take(limit)
                .skip(calculatedStartIndex)
                .orderBy(`${this.alias}.${orderBy}`)
                .getMany()
        } 
    }

}