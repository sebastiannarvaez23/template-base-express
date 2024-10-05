import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { ServiceEntity } from "../../domain/entities/service.entity";
import { ServiceModel } from "../models/service.model";
import { ServicesRepository } from "../../domain/repositories/service.repository";

export class ServicesRepositoryImpl implements ServicesRepository {

    async getList({ limit, offset }: { limit: number; offset: number }): Promise<{ rows: ServiceModel[]; count: number; }> {
        try {
            return await ServiceModel.findAndCountAll({
                order: [["createdAt", "desc"]],
                limit: limit,
                offset: offset,
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<ServiceModel | null> {
        try {
            const service = await ServiceModel.findOne(
                { where: { id } });
            if (!service) {
                throw new HttpError("040001");
            }
            return service;
        } catch (error) {
            throw error;
        }
    }

    async add(service: ServiceEntity): Promise<ServiceModel> {
        try {
            return await ServiceModel.create(
                service as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, service: ServiceEntity): Promise<ServiceModel> {
        try {
            const [affectRows, editedService] = await ServiceModel.update(
                service as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedService[0]) throw new HttpError("040001")
            return editedService[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<ServiceModel> {
        try {
            const serviceToDelete = await ServiceModel.findOne({
                where: { id: id }
            });
            if (!serviceToDelete) {
                throw new HttpError("040001");
            }
            await serviceToDelete.destroy();
            return serviceToDelete;
        } catch (error) {
            throw error;
        }
    }
}