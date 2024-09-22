import { config } from 'dotenv';
import { createClient } from 'redis';

config();

export class RedisConfig {

    public redisClient: any;

    constructor() {
        const redisUrl: string = process.env.URL_REDIS!;
        this.redisClient = createClient({ url: redisUrl });
        this.redisClient.connect();
    }

    public getRedisClient() {
        return this.redisClient;
    }

    public closeConn() {
        this.redisClient.close();
    }
}
