import { Sequelize } from 'sequelize';

const mockSequelize = new Sequelize('sqlite::memory:', { logging: false });

const mockRedisClient = {
    connect: jest.fn().mockResolvedValue(null),
    setEx: jest.fn().mockResolvedValue(null),
    get: jest.fn().mockResolvedValue('mocked_token'),
    del: jest.fn().mockResolvedValue(1),
    quit: jest.fn().mockResolvedValue(null),
};

class DatabaseConfig {
    public database: Sequelize;
    public redisClient: any;

    constructor() {
        this.database = mockSequelize;
        this.redisClient = mockRedisClient;
    }
}

const databaseConfig = new DatabaseConfig();

export { databaseConfig };
