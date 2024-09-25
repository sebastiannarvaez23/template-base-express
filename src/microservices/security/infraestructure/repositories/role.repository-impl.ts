import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { RoleEntity } from "../../domain/entities/role.entity";
import { RoleModel } from "../models/role.model";
import { RolesRepository } from "../../domain/repositories/roles.repository";
import { ServiceModel } from "../models/service.model";

export class RolesRepositoryImpl implements RolesRepository {

    async getList({ limit, offset }: { limit: number; offset: number }): Promise<{ rows: RoleModel[]; count: number; }> {
        try {
            return await RoleModel.findAndCountAll({
                order: [["createdAt", "desc"]],
                limit: limit,
                offset: offset,
                include: [{
                    model: ServiceModel,
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
                { where: { id } });
            if (!person) {
                throw new HttpError("020001");
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
            if (!editedPerson[0]) throw new HttpError("020001")
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
                throw new HttpError("020001");
            }
            await personToDelete.destroy();
            return personToDelete;
        } catch (error) {
            throw error;
        }
    }
}