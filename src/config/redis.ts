import { config } from "dotenv";
import { createClient } from "redis";

import { HttpError } from "../lib-core/utils/error.util";

config();

export class RedisConfig {

    private readonly _redisClient: any;
    private readonly _redisUrl: string;
    private readonly _SESION_SG_EXP: number;

    constructor() {
        this._redisUrl = process.env.REDIS_URL!;
        this._SESION_SG_EXP = Number(process.env.SESION_SG_EXP!);
        this._redisClient = createClient({ url: this._redisUrl });

        this._redisClient.on('error', (err: any) => {
            console.error('Redis Client Error', err);
        });

        this._redisClient.connect();
    }

    async storeTokenInRedis(nickname: string, token: string) {
        const expiryTime = this._SESION_SG_EXP;
        if (isNaN(expiryTime)) {
            throw new HttpError("000015");
        }

        await this._redisClient.setEx(nickname, expiryTime, token)
            .catch((err: any) => {
                console.error('Error storing token in Redis:', err);
                throw new HttpError("000001");
            });
    }

    async getTokenFromRedis(nickname: string) {
        try {
            return await this._redisClient.get(nickname);
        } catch (err) {
            console.error('Error retrieving token from Redis:', err);
            throw new HttpError("000002");
        }
    }

    async getResetPassTokenFromRedis(token: string) {
        try {
            return await this._redisClient.get(`passwordReset:${token}`);
        } catch (err) {
            console.error('Error retrieving token from Redis:', err);
            throw new HttpError("000002");
        }
    }

    async storeResetPassToken(resetToken: string, userId: string) {
        this._redisClient.set(`passwordReset:${resetToken}`, userId, 'EX', 300);
    }

    async deleteToken(nickname: string) {
        try {
            return await this._redisClient.del(nickname);
        } catch (err) {
            console.error('Error retrieving token from Redis:', err);
            throw new HttpError("000002");
        }
    }

    async deleteResetPassToken(token: string) {
        try {
            return await this._redisClient.del(`passwordReset:${token}`);
        } catch (err) {
            console.error('Error retrieving token from Redis:', err);
            throw new HttpError("000002");
        }
    }

    public closeConn() {
        this._redisClient.quit();
    }
}
