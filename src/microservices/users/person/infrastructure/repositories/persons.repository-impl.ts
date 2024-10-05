import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { PersonEntity } from "../../domain/entities/person.entity";
import { PersonModel } from "../models/person.model";
import { PersonsRepository } from "../../domain/repositories/persons.repository";

export class PersonsRepositoryImpl implements PersonsRepository {

    async getList({ limit, offset }: { limit: number; offset: number }): Promise<{ rows: PersonModel[]; count: number; }> {
        try {
            return await PersonModel.findAndCountAll({
                order: [["createdAt", "desc"]],
                limit: limit,
                offset: offset,
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
            return await PersonModel.create(
                person as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
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