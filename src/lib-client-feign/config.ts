import axios, { AxiosInstance } from "axios";

export class ClientFeignConfig {
    private baseURL: string;
    private httpClient: AxiosInstance;

    constructor() {
        this.baseURL = process.env.BASE_URL! + process.env.API_VERSION!;

        this.httpClient = axios.create({
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.httpClient.interceptors.request.use(
            config => {
                const token = process.env.AUTH_TOKEN;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        this.httpClient.interceptors.response.use(
            response => response,
            error => {
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
