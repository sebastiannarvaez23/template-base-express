import { PersonModel } from '../../infrastructure/models/person.model';
import { PersonEntity } from '../entities/person.entity';

export interface PersonsRepository {
    getList(): Promise<PersonModel[]>;
    get(id: string): Promise<PersonModel | null>;
    add(person: PersonEntity): Promise<PersonModel>;
    edit(id: string, person: PersonEntity): Promise<PersonModel>;
    delete(id: string): Promise<PersonModel>;
}