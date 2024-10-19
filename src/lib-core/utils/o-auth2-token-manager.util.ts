import jwt from "jsonwebtoken";

import { RedisConfig } from "../../config/redis";
import { HttpError } from "../../api-gateway/domain/entities/error.entity";

interface OAuth2TokenPayload {
    sub: string;      // Identificador del cliente
    iss: string;      // Emisor del token
    aud: string;      // Audiencia del token
    exp: number;      // Tiempo de expiración (Unix timestamp)
    iat: number;      // Tiempo de emisión (Unix timestamp)
}

export class OAuth2TokenManager {
    private static instance: OAuth2TokenManager;
    private redisConfig: RedisConfig;
    private issuer: string;
    private audience: string;

    private constructor(redisConfig: RedisConfig) {
        this.redisConfig = redisConfig;
        this.issuer = process.env.JWT_ISSUER || "your_issuer";
        this.audience = process.env.JWT_AUDIENCE || "your_audience";
    }

    public static getInstance(redisConfig?: RedisConfig): OAuth2TokenManager {
        if (!OAuth2TokenManager.instance) {
            if (!redisConfig) {
                throw new Error("RedisConfig instance is required for OAuth2TokenManager initialization.");
            }
            OAuth2TokenManager.instance = new OAuth2TokenManager(redisConfig);
        }
        return OAuth2TokenManager.instance;
    }

    public async generateToken(payload: Omit<OAuth2TokenPayload, 'iss' | 'aud' | 'exp' | 'iat'>, secret: string, expiresIn: string | number): Promise<string> {
        try {
            const fullPayload: Omit<OAuth2TokenPayload, 'exp' | 'iat'> = {
                ...payload,
                iss: this.issuer,
                aud: this.audience,
                sub: "microservice_" + payload.sub
            };
            const token = jwt.sign(fullPayload, secret);
            await this.redisConfig.storeTokenInRedis(fullPayload.sub, token);
            return token;
        } catch (error) {
            console.error("Error generando token OAuth2:", error);
            throw new HttpError("000016");
        }
    }

    public async verifyToken(token: string, secret: string): Promise<OAuth2TokenPayload> {
        try {
            const decoded = jwt.verify(token, secret) as OAuth2TokenPayload;
            const isTokenValid = await this.redisConfig.getTokenFromRedis(decoded.sub);
            if (!isTokenValid) throw new HttpError("000007");
            return decoded;
        } catch (error) {
            console.error("Error verificando token OAuth2:", error);
            if (error instanceof jwt.TokenExpiredError) {
                throw new HttpError("000006");
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new HttpError("000007");
            }
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError("000007");
        }
    }

    public async revokeToken(sub: string): Promise<void> {
        try {
            await this.redisConfig.deleteToken(sub);
        } catch (error) {
            console.error("Error revocando token OAuth2:", error);
            throw new HttpError("000018");
        }
    }
}