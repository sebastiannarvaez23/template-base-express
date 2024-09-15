import { PersonEntity } from '../entities/person.entity';

export interface PersonsRepository {
    getList(): Promise<PersonEntity[]>;
    get(id: string): Promise<PersonEntity | null>;
    add(person: PersonEntity): Promise<PersonEntity>;
    edit(id: string, person: PersonEntity): Promise<PersonEntity>;
    editByUser(id: string, person: PersonEntity): Promise<PersonEntity[]>;
}