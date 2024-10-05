import { ForeignKeyConstraintError, Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { PersonEntity } from "../../domain/entities/person.entity";
import { PersonModel } from "../models/person.model";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { QueryParams } from "../../../../../lib-entities/query-params.entity";
import { RoleModel } from "../../../../security/role/infraestructure/models/role.model";
import { UserModel } from "../../../user/infrastructure/models/user.model";

export class PersonsRepositoryImpl implements PersonsRepository {

    async getList(queryParams: QueryParams): Promise<{ rows: PersonModel[]; count: number; }> {
        try {
            return await PersonModel.findAndCountAll({
                where: queryParams.filters,
                order: [["createdAt", "desc"]],
                limit: queryParams.limit,
                offset: queryParams.offset,
            });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<PersonModel | null> {
        try {
            const person = await PersonModel.findOne(
                { where: { id } });
            if (!person) {
                throw new HttpError("020001");
            }
            return person;
        } catch (error) {
            throw error;
        }
    }

    async add(person: PersonEntity): Promise<PersonModel> {
        try {
            const roleExists = await RoleModel.findOne(
                { where: { id: person.roleId, deletedAt: null } });
            if (!roleExists) throw new HttpError("030001");
            const userExists = await UserModel.findOne(
                { where: { id: person.userId, deletedAt: null } });
            if (!userExists) throw new HttpError("010001");
            return await PersonModel.create(
                person as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError || error instanceof ForeignKeyConstraintError) {
                throw error;
            }
            throw error;
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonModel> {
        try {
            const [affectRows, editedPerson] = await PersonModel.update(
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

    async delete(id: string): Promise<PersonModel> {
        try {
            const personToDelete = await PersonModel.findOne({
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