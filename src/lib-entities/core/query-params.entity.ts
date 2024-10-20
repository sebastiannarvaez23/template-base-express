export interface QueryParams {
    limit: number;
    offset: number;
    filters: { [key: string]: any };
}