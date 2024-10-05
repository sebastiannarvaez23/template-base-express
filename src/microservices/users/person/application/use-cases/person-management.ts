import { PersonEntity } from "../../domain/entities/person.entity";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { PersonModel } from "../../infrastructure/models/person.model";

export class PersonManagement {
    constructor(
        private readonly _personsRepository: PersonsRepository
    ) { }

    async getList({ limit, offset }: { limit: number; offset: number }): Promise<{ rows: PersonModel[]; count: number; }> {
        try {
            return await this._personsRepository.getList({ limit, offset }, { filters: [] });
        } catch (e) {
            throw e;
        }
    }

    async get(id: string): Promise<PersonModel | null> {
        try {
            return await this._personsRepository.get(id);
        } catch (e) {
            throw e;
        }
    }

    async add(person: PersonEntity): Promise<PersonEntity | null> {
        try {
            return await this._personsRepository.add(person);
        } catch (e) {
            throw e;
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonEntity | null> {
        try {
            const resultUser = await this._personsRepository.edit(id, person);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: string): Promise<PersonModel | null> {
        try {
            const resultUser = await this._personsRepository.delete(id);
            return resultUser;
        } catch (e) {
            throw e;
        }
    }
}