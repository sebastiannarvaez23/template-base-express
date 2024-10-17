import { config } from "dotenv";
import { Dialect } from "sequelize";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { OAuthClientModel } from "../microservices/auth/domain/entities/o-auth-client.model";
import { PersonModel } from "../microservices/users/person/infrastructure/models/person.model";
import { RoleModel } from "../microservices/security/role/infraestructure/models/role.model";
import { RoleServiceModel } from "../microservices/security/role/infraestructure/models/role-service.model";
import { ServiceModel } from "../microservices/security/service/infraestructure/models/service.model";
import { UserModel } from "../microservices/users/user/infrastructure/models/user.model";

config();

export class DatabaseConfig {

    private sequelize: Sequelize;
    public redisClient: any;

    constructor() {
        const name: string = process.env.DB_NAME!;
        const user: string = process.env.DB_USER!;
        const password: string = process.env.DB_PASSWORD!;
        const host: string = process.env.DB_HOST!;
        const port: number = Number(process.env.DB_PORT!);
        const driver: Dialect = process.env.DB_DRIVER as Dialect;

        const databaseOptions: SequelizeOptions = {
            host: host,
            port: port,
            dialect: driver,
            models: [
                OAuthClientModel,
                UserModel,
                PersonModel,
                RoleModel,
                ServiceModel,
                RoleServiceModel
            ],
        };

        this.sequelize = new Sequelize(name, user, password, databaseOptions);
    }

    public getDatabase() {
        return this.sequelize;
    }

    public async syncDatabase() {
        try {
            await this.sequelize.sync({ alter: true });
            console.log('Synchronized database and tables');
        } catch (err) {
            console.error('Error syncing: ', err);
        }
    }
}
