import jwt from "jsonwebtoken";

import { RedisConfig } from "../../config/redis";
import { HttpError } from "../../api-gateway/domain/entities/error.entity";

interface OAuth2TokenPayload {
    sub: string;      // Identificador del cliente
    scope: string[];  // Alcances del token
    iss: string;      // Emisor del token
    aud: string;      // Audiencia del token
    exp: number;      // Tiempo de expiración (Unix timestamp)
    iat: number;      // Tiempo de emisión (Unix timestamp)
}

export class OAuth2TokenManager {
    private static instance: OAuth2TokenManager;
    private redisConfig: RedisConfig;
    private secret: string;
    private tokenExpiry: string | number;
    private issuer: string;
    private audience: string;

    private constructor(redisConfig: RedisConfig) {
        this.redisConfig = redisConfig;
        this.secret = process.env.JWT_SECRET || "default_secret";
        this.tokenExpiry = process.env.TOKEN_EXPIRY || "1h";
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

    /**
     * Genera un token OAuth2.
     * @param payload Payload del token.
     * @returns Token JWT.
     */
    public async generateToken(payload: Omit<OAuth2TokenPayload, 'iss' | 'aud' | 'exp' | 'iat'>): Promise<string> {
        try {
            const fullPayload: OAuth2TokenPayload = {
                ...payload,
                iss: this.issuer,
                aud: this.audience,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + this.getExpiryInSeconds(),
            };

            // Firmar el token
            const token = jwt.sign(fullPayload, this.secret, { expiresIn: this.tokenExpiry });

            // Almacenar el token en Redis con expiración
            await this.redisConfig.storeTokenInRedis(`whitelist_token:${token}`, this.getExpiryInSeconds().toString());

            return token;
        } catch (error) {
            console.error("Error generando token OAuth2:", error);
            throw new HttpError("000016");
        }
    }

    /**
     * Verifica la validez de un token OAuth2.
     * @param token Token JWT.
     * @returns Payload del token si es válido.
     */
    public async verifyToken(token: string): Promise<OAuth2TokenPayload> {
        try {
            // Verificar la firma y los claims del token
            const decoded = jwt.verify(token, this.secret, { issuer: this.issuer, audience: this.audience }) as OAuth2TokenPayload;

            // Verificar que el token está en la lista blanca
            const isTokenValid = await this.redisConfig.getTokenFromRedis(`whitelist_token:${token}`);
            if (!isTokenValid) {
                throw new HttpError("000007");
            }

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

    /**
     * Revoca un token OAuth2 eliminándolo de la lista blanca.
     * @param token Token JWT.
     */
    public async revokeToken(token: string): Promise<void> {
        try {
            await this.redisConfig.deleteToken(`whitelist_token:${token}`);
        } catch (error) {
            console.error("Error revocando token OAuth2:", error);
            throw new HttpError("000018");
        }
    }

    /**
     * Calcula el tiempo de expiración en segundos basado en la configuración.
     * @returns Expiración en segundos.
     */
    private getExpiryInSeconds(): number {
        const expiry = this.tokenExpiry.toString();
        const match = expiry.match(/(\d+)([smhd])/);
        if (!match) return 3600; // Default a 1 hora
        const value = parseInt(match[1]);
        const unit = match[2];
        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 3600;
            case 'd':
                return value * 86400;
            default:
                return 3600;
        }
    }
}