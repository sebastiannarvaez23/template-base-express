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
            const person = await PersonModel.findOne({ where: { id } });
            if (!person) {
                throw new Error('Person not found');
            }
            return person;
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }

    async add(person: PersonEntity): Promise<PersonEntity> {
        try {
            return (await PersonModel.create(person));
        } catch (error) {
            console.debug(error);
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
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }

    async delete(id: string): Promise<PersonEntity> {
        try {
            // Encuentra la persona antes de marcarla como eliminada
            const personToDelete = await PersonModel.findOne({
                where: { id: id }
            });

            if (!personToDelete) {
                throw new Error('Person not found');
            }

            // Realiza el soft delete (marca el registro como eliminado)
            await personToDelete.destroy();

            return personToDelete;
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }
}