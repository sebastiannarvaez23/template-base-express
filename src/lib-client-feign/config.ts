import axios, { AxiosInstance } from "axios";

export class ClientFeignConfig {

    private baseURL: string;
    private httpClient: AxiosInstance;
    private isTokenBeingFetched: boolean = false;
    private tokenPromise: Promise<void> | null = null;

    public token: string | null = null;
    public clientSecret: string;
    public clientId: string;

    constructor(clientId: string, clientSecret: string) {
        this.baseURL = process.env.BASE_URL! + process.env.API_VERSION!;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this.httpClient = this.getHttpClient();

        this.httpClient.interceptors.request.use(
            async config => {
                if (!this.token) {
                    if (!this.isTokenBeingFetched) {
                        this.isTokenBeingFetched = true;
                        this.tokenPromise = this.getToken();
                        await this.tokenPromise;
                        this.isTokenBeingFetched = false;
                    } else if (this.tokenPromise) {
                        await this.tokenPromise;
                    }
                }
                config.headers.Authorization = `Bearer ${this.token}`;
                return config;
            },
            error => Promise.reject(error)
        );
    }

    async getToken() {
        try {
            const tokenClient = this.getHttpClient();
            const tokenE = await tokenClient.post<{ token: string }>(
                `${this.baseURL}/auth/token-oauth`,
                { client_id: this.clientId, client_secret: this.clientSecret }
            );
            this.token = tokenE.data.token;
        } catch (error) {
            console.error("Error al obtener el token:", error);
            this.token = null;
        }
    }

    public getHttpClient(): AxiosInstance {
        return axios.create({
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public getBaseUrl(): string {
        return this.baseURL;
    }
}
