import { PersonModel } from "../models/person.model";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { UniqueConstraintError } from "sequelize";
import { PersonEntity } from "../../domain/entities/person.entity";

export class PersonsRepositoryImpl implements PersonsRepository {

    async getList(): Promise<PersonModel[]> {
        try {
            return await PersonModel.findAll({ order: [["createdAt", "desc"]], });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async get(id: string): Promise<PersonEntity | null> {
        try {
            return await PersonModel.findOne({ where: { id } });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async add(person: PersonEntity): Promise<PersonEntity> {
        try {
            return (await PersonModel.create(person));
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new Error("An unexpected error occurred.");
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonEntity> {
        try {
            const [affectRows, editedPerson] = await PersonModel.update(person, {
                where: {
                    id: id,
                },
                returning: true
            });
            return editedPerson[0];
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }
}