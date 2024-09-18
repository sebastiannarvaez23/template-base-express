import { config } from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { Dialect } from 'sequelize';
import { PersonModel } from '../microservices/users/infrastructure/models/person.model';
import { UserModel } from '../microservices/users/infrastructure/models/user.model';

config();

const name: string = process.env.DB_NAME!;
const user: string = process.env.DB_USER!;
const password: string = 'admin';
const host: string = process.env.DB_HOST!;
const driver: Dialect = process.env.DB_DRIVER as Dialect;

const databaseOptions: SequelizeOptions = {
    host: host,
    port: 5432,
    dialect: driver,
    models: [UserModel, PersonModel],
};

const database = new Sequelize(name, user, password, databaseOptions);

export default database;
