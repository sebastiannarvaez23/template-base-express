import jwt from "jsonwebtoken";

import { RedisConfig } from "../../config/redis";
import { HttpError } from "../../api-gateway/domain/entities/error.entity";

interface TokenPayload {
    sub: string;
    name: string;
    role: string;
    services: string[];
}

export class TokenManager {
    private static instance: TokenManager;
    private redisConfig: RedisConfig;
    private currentToken: string | null = null;

    private constructor(redisConfig: RedisConfig) {
        this.redisConfig = redisConfig;
    }

    public static getInstance(redisConfig?: RedisConfig): TokenManager {
        if (!TokenManager.instance) {
            if (!redisConfig) {
                throw new Error("RedisConfig instance is required for TokenManager initialization.");
            }
            TokenManager.instance = new TokenManager(redisConfig);
        }
        return TokenManager.instance;
    }

    public async generateToken(payload: TokenPayload, secret: string, expiresIn: string | number): Promise<string> {
        try {
            const token = jwt.sign(payload, secret, { expiresIn });
            await this.redisConfig.storeTokenInRedis(payload.name, token);
            this.currentToken = token;
            return token;
        } catch (error) {
            console.error("Error generando token:", error);
            throw new HttpError("000016");
        }
    }

    public async verifyToken(token: string, secret: string): Promise<TokenPayload> {
        try {
            const decoded = jwt.verify(token, secret) as TokenPayload;
            const storedToken = await this.redisConfig.getTokenFromRedis(decoded.sub);
            if (storedToken !== token) throw new HttpError("000017");
            return decoded;
        } catch (error) {
            console.error("Error verificando token:", error);
            if (error instanceof jwt.TokenExpiredError) {
                throw new HttpError("000006");
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new HttpError("000007");
            }
            throw new HttpError("000017");
        }
    }

    public async revokeToken(nickname: string): Promise<void> {
        try {
            await this.redisConfig.deleteToken(nickname);
            this.currentToken = null;
        } catch (error) {
            console.error("Error revocando token:", error);
            throw new HttpError("000018");
        }
    }

    public setToken(token: string): void {
        this.currentToken = token;
    }

    public getToken(): string | null {
        return this.currentToken;
    }

    public clearToken(): void {
        this.currentToken = null;
    }
}
