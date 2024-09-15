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
            return await PersonModel.findOne({ where: { id } });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async add(person: PersonModel): Promise<PersonModel> {
        try {
            return await PersonModel.create(person);
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async edit(id: string, person: PersonModel): Promise<PersonModel> {
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

    async editByUser(id: string, person: PersonModel): Promise<PersonModel[]> {
        try {
            const [affectRows, editedPerson] = await PersonModel.update(person, {
                where: {
                    id: id,
                },
                returning: true
            });

            return editedPerson;
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }
}