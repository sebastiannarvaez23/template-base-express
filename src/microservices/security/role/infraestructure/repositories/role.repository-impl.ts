import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { QueryParams } from "../../../../../lib-entities/core/query-params.entity";
import { RoleEntity } from "../../../../../lib-entities/security/role.entity";
import { RoleModel } from "../../domain/models/role.model";
import { RolesRepository } from "../../domain/repositories/roles.repository";
import { ServiceModel } from "../../../service/domain/models/service.model";

export class RolesRepositoryImpl implements RolesRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: RoleModel[]; count: number; }> {
        try {
            return await RoleModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                limit: queryParams.limit,
                offset: queryParams.offset,
                attributes: {
                    exclude: ['updatedAt', 'deletedAt']
                },
                include: [{
                    model: ServiceModel,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                    through: {
                        attributes: []
                    }
                }],
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<RoleModel | null> {
        try {
            const person = await RoleModel.findOne(
                {
                    where: { id },
                    include: [
                        {
                            model: ServiceModel,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                            through: {
                                attributes: []
                            }
                        }
                    ]
                });
            if (!person) {
                throw new HttpError("030001");
            }
            return person;
        } catch (error) {
            throw error;
        }
    }

    async add(person: RoleEntity): Promise<RoleModel> {
        try {
            return await RoleModel.create(
                person as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async edit(id: string, person: RoleEntity): Promise<RoleModel> {
        try {
            const [affectRows, editedPerson] = await RoleModel.update(
                person as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError("030001")
            return editedPerson[0];
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<RoleModel> {
        try {
            const personToDelete = await RoleModel.findOne({
                where: { id: id }
            });
            if (!personToDelete) {
                throw new HttpError("030001");
            }
            await personToDelete.destroy();
            return personToDelete;
        } catch (error) {
            throw error;
        }
    }

    async addServiceAssignment(roleId: string, services: string[]): Promise<RoleModel> {
        try {

            let role = await RoleModel.findOne({
                where: { id: roleId }
            });

            const serviceInstances = await ServiceModel.findAll({
                where: { id: services }
            });

            if (!role) throw new HttpError("030001");
            if (serviceInstances.length !== services.length) throw new HttpError("040002");

            await role.$add('services', serviceInstances);

            role = await RoleModel.findOne({
                where: { id: roleId },
                include: [ServiceModel],
            });
            if (!role) throw new HttpError("030001");

            return role;

        } catch (error) {
            throw error;
        }
    }

    async deleteServiceAssignment(roleId: string, services: string[]): Promise<RoleModel> {
        try {

            let role = await RoleModel.findOne({
                where: { id: roleId }
            });

            const serviceInstances = await ServiceModel.findAll({
                where: { id: services }
            });

            if (!role) throw new HttpError("030001");
            if (serviceInstances.length !== services.length) throw new HttpError("040002");

            await role.$remove('services', serviceInstances);

            role = await RoleModel.findOne({
                where: { id: roleId },
                include: [ServiceModel],
            });
            if (!role) throw new HttpError("030001");

            return role;

        } catch (error) {
            throw error;
        }
    }
}