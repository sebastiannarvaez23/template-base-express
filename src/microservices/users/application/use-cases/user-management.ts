import { config } from 'dotenv';

import { PersonEntity } from "../../domain/entities/person.entity";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { UsersRepository } from "../../domain/repositories/users.repository";

config();

export class UserManagement {
    constructor(
        private readonly _repository: UsersRepository,
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
            console.debug('---> add', e);
            return null;
        }
    }

    async edit(id: string, person: PersonEntity): Promise<PersonEntity | null> {
        try {
            const resultUser = await this._personsRepository.edit(id, person);
            return resultUser;
        } catch (e) {
            console.debug(e)
            return null;
        }
    }
}