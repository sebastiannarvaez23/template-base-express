import { config } from 'dotenv';
import { createClient } from 'redis';
import { Dialect } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { PersonModel } from '../microservices/users/infrastructure/models/person.model';
import { RoleModel } from '../microservices/security/infraestructure/models/role.model';
import { UserModel } from '../microservices/users/infrastructure/models/user.model';

config();

export class DatabaseConfig {

    private sequelize: Sequelize;
    public redisClient: any;

    constructor() {
        const name: string = process.env.DB_NAME!;
        const user: string = process.env.DB_USER!;
        const password: string = process.env.DB_PASSWORD!;
        const host: string = process.env.DB_HOST!;
        const driver: Dialect = process.env.DB_DRIVER as Dialect;


        const databaseOptions: SequelizeOptions = {
            host: host,
            port: 5432,
            dialect: driver,
            models: [UserModel, PersonModel, RoleModel],
        };

        this.sequelize = new Sequelize(name, user, password, databaseOptions);

        const redisUrl: string = process.env.URL_REDIS!;

        this.redisClient = createClient({ url: redisUrl });
        this.redisClient.connect();
    }

    public getDatabase() {
        return this.sequelize;
    }

    public getRedisClient() {
        return this.redisClient;
    }
}
