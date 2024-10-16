import axios, { AxiosInstance } from "axios";

import { oAuth2TokenManager } from "../microservices/auth/dependencies";
import { HttpError } from "../api-gateway/domain/entities/error.entity";

export class ClientFeignConfig {

    private baseURL: string;
    private httpClient: AxiosInstance;
    private clientId: string;
    private token: string | null = null;
    private secretKey: string;
    private exp: string;

    constructor(clientId: string, clientSecret: string) {
        this.baseURL = process.env.BASE_URL! + process.env.API_VERSION!;
        this.secretKey = process.env.SECRET_KEY!;
        this.exp = process.env.SESION_SG_EXP!;
        this.clientId = clientId;

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
                        const payload = {
                            sub: this.clientId,
                            scope: ['read', 'write'],
                        };
                        this.token = await oAuth2TokenManager.generateToken(payload, this.secretKey, this.exp);
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
                    this.token = null;
                    try {
                        const payload = {
                            sub: this.clientId,
                            scope: ['read', 'write'],
                        };

                        this.token = await oAuth2TokenManager.generateToken(payload, this.secretKey, this.exp);
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