export default interface PaginationResponseImp<T> {
    size: number;
    page: number;
    previous: boolean;
    next: boolean;
    items: T[];
}