import axios, { AxiosInstance } from "axios";
import { oAuth2TokenManager } from "../microservices/auth/dependencies";

import { OAuthClientRepository } from "../microservices/auth/infraestructure/repositories/o-auth-client-impl.repository";
import { OAuth2TokenManager } from "../lib-core/utils/o-auth2-token-generator.util";
import { RedisConfig } from "../config/redis";
import { HttpError } from "../api-gateway/domain/entities/error.entity";

const oAuthClientRepository = new OAuthClientRepository();

const redisConfig = new RedisConfig();

export class ClientFeignConfig {

    private baseURL: string;
    private httpClient: AxiosInstance;
    private oauth2TokenManager: OAuth2TokenManager;
    private clientId: string;
    private clientSecret: string;
    private token: string | null = null;

    constructor(clientId: string, clientSecret: string) {
        this.baseURL = process.env.BASE_URL! + process.env.API_VERSION!;
        this.oauth2TokenManager = oAuth2TokenManager;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this.httpClient = axios.create({
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.httpClient.interceptors.request.use(
            async config => {
                if (!this.token) {
                    try {
                        // Crear el payload con `clientId` y otros valores necesarios
                        const payload = {
                            sub: this.clientId,          // ID del cliente como sujeto
                            scope: ['your_scope_here'],  // Ajusta el scope a lo que necesites
                        };

                        // Generar el token pasando el payload completo
                        this.token = await this.oauth2TokenManager.generateToken(payload);
                    } catch (error) {
                        console.error("Error obteniendo token OAuth2:", error);
                        throw new HttpError("000016");
                    }
                }
                config.headers.Authorization = `Bearer ${this.token}`;
                return config;
            },
            error => Promise.reject(error)
        );

        this.httpClient.interceptors.response.use(
            response => response,
            async error => {
                if (error.response && error.response.status === 401) {
                    // Token inválido o expirado, intentar renovar
                    this.token = null; // Resetear el token
                    try {
                        // Crear el payload de nuevo para generar un nuevo token
                        const payload = {
                            sub: this.clientId,          // ID del cliente
                            scope: ['your_scope_here'],  // Ajustar el scope según necesidad
                        };

                        // Generar un nuevo token
                        this.token = await this.oauth2TokenManager.generateToken(payload);

                        // Reintentar la solicitud original con el nuevo token
                        error.config.headers.Authorization = `Bearer ${this.token}`;
                        return axios.request(error.config);
                    } catch (tokenError) {
                        console.error("Error renovando token OAuth2:", tokenError);
                        return Promise.reject(tokenError);
                    }
                }
                console.error('Error en la solicitud HTTP:', error);
                return Promise.reject(error);
            }
        );
    }

    public getHttpClient(): AxiosInstance {
        return this.httpClient;
    }

    public getBaseUrl(): string {
        return this.baseURL;
    }
}