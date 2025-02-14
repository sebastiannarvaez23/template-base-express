export interface QueryParams {
    limit: number;
    offset: number;
    filters: { [key: string]: any };
    through?: { [key: string]: any };
}