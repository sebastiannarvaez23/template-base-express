import { ServiceEntity } from "../entities/service.entity";
import { ServiceModel } from "../../infraestructure/models/service.model";

export interface ServicesRepository {
    getList({ limit, offset }: { limit: number; offset: number }): Promise<{ rows: ServiceModel[]; count: number; }>;
    get(id: string): Promise<ServiceModel | null>;
    add(person: ServiceEntity): Promise<ServiceModel>;
    edit(id: string, person: ServiceEntity): Promise<ServiceModel>;
    delete(id: string): Promise<ServiceModel>;
}