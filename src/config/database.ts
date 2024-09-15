import { config } from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

config();

const name: string = process.env.DB_NAME!;
const user: string = process.env.DB_USER!;
const password: string = 'admin';
const host: string = process.env.DB_HOST!;
const driver: Dialect = process.env.DB_DRIVER as Dialect;

const database = new Sequelize(
    name,
    user,
    password,
    {
        host: host,
        port: 5432,
        dialect: driver
    }
);

export default database;