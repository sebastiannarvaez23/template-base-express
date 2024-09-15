import { PersonEntity } from '../../domain/entities/person.entity';
import { PersonsRepository } from "../../domain/repositories/persons.repository";

export class PersonManagement {
    constructor(
        private readonly _repository: PersonsRepository
    ) { }

    async edit(id: string, person: PersonEntity): Promise<PersonEntity | null> {
        try {
            return await this._repository.edit(id, person);
        } catch (e) {
            console.debug(e)
            return null;
        }
    }
}