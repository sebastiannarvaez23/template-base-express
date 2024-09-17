import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { PersonEntity } from "../../domain/entities/person.entity";
import { PersonModel } from "../models/person.model";
import { PersonsRepository } from "../../domain/repositories/persons.repository";

export class PersonsRepositoryImpl implements PersonsRepository {

    async getList(): Promise<PersonModel[]> {
        try {
            return await PersonModel.findAll({ order: [["createdAt", "desc"]], });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<PersonModel | null> {
        try {
            const person = await PersonModel.findOne({ where: { id } });
            if (!person) {
                throw new HttpError('Person not found', 404);
            }
            return person;
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }

    async add(person: PersonEntity): Promise<PersonModel> {
        try {
            return (await PersonModel.create(person as Optional<any, string>));
        } catch (error) {
            console.debug(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("An unexpected error occurred.", 500);
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonModel> {
        try {
            const [affectRows, editedPerson] = await PersonModel.update(person as Optional<any, string>, {
                where: {
                    id: id,
                },
                returning: true
            });
            if (!editedPerson[0]) throw new HttpError('Person not found', 404)
            return editedPerson[0];
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }

    async delete(id: string): Promise<PersonModel> {
        try {
            const personToDelete = await PersonModel.findOne({
                where: { id: id }
            });
            if (!personToDelete) {
                throw new HttpError('Person not found', 404);
            }
            await personToDelete.destroy();
            return personToDelete;
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }
}