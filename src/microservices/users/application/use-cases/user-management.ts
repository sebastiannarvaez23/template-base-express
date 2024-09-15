import { config } from 'dotenv';

import { PersonEntity } from "../../domain/entities/person.entity";
import { PersonsRepository } from "../../domain/repositories/persons.repository";
import { UsersRepository } from "../../domain/repositories/users.repository";

config();

export class UserManagement {
    constructor() { }
}