import { PersonEntity } from '../../domain/entities/person.entity';
import { PersonsRepository } from "../../domain/repositories/persons.repository";

export class PersonManagement {
    constructor(
        private readonly _personsRepository: PersonsRepository
    ) { }

    async getList(query: any): Promise<PersonEntity[] | null> {
        try {
            return await this._personsRepository.getList();
        } catch (e) {
            console.debug(e);
            return null;
        }
    }

    async get(id: string): Promise<PersonEntity | null> {
        try {
            return await this._personsRepository.get(id);
        } catch (e) {
            console.debug(e);
            return null;
        }
    }

    async add(person: PersonEntity): Promise<PersonEntity | null> {
        try {
            return await this._personsRepository.add(person);
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonEntity | null> {
        try {
            const resultUser = await this._personsRepository.edit(id, person);
            return resultUser;
        } catch (e) {
            console.debug(e)
            throw e;
        }
    }
}