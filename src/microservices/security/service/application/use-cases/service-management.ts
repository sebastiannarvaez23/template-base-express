import { QueryParams } from "../../../../../lib-entities/query-params.entity";
import { ServiceEntity } from "../../domain/entities/service.entity";
import { ServiceModel } from "../../domain/models/service.model";
import { ServicesRepository } from "../../domain/repositories/service.repository";

export class ServiceManagement {

    constructor(
        private readonly _servicesRepository: ServicesRepository
    ) { }

    async getList(queryParams: QueryParams): Promise<{ rows: ServiceModel[]; count: number; }> {
        try {
            return await this._servicesRepository.getList(queryParams);
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<ServiceModel | null> {
        try {
            return await this._servicesRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(person: ServiceEntity): Promise<ServiceEntity | null> {
        try {
            return await this._servicesRepository.add(person);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, person: ServiceEntity): Promise<ServiceEntity | null> {
        try {
            const resultService = await this._servicesRepository.edit(id, person);
            return resultService;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<ServiceModel | null> {
        try {
            const resultService = await this._servicesRepository.delete(id);
            return resultService;
        } catch (e) {
            throw e;
        }
    }
}