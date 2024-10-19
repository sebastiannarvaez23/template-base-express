import { QueryParams } from "../../../../../lib-entities/query-params.entity";
import { ServiceEntity } from "../entities/service.entity";
import { ServiceModel } from "../models/service.model";

export interface ServicesRepository {
    getList(queryParams: QueryParams): Promise<{ rows: ServiceModel[]; count: number; }>;
    get(id: string): Promise<ServiceModel | null>;
    add(person: ServiceEntity): Promise<ServiceModel>;
    edit(id: string, person: ServiceEntity): Promise<ServiceModel>;
    delete(id: string): Promise<ServiceModel>;
}