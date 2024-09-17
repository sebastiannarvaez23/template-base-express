import { config } from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';  // Importa SequelizeOptions
import { PersonModel } from '../microservices/users/infrastructure/models/person.model';
import { Dialect } from 'sequelize';

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
    models: [PersonModel],
};

const database = new Sequelize(name, user, password, databaseOptions);

export default database;
