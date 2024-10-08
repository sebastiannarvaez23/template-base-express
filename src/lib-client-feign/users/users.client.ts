import { HttpError } from "../../api-gateway/domain/entities/error.entity";
import { AuthEntity } from "../../microservices/auth/domain/entities/auth.entity";
import { ClientFeignConfig } from "../config";

export class UserClientFeign extends ClientFeignConfig {

    private baseURL: string;

    constructor() {
        super();
        this.baseURL = "http://localhost:3000/api/v1";
    }

    public async validateCredential(credentials: AuthEntity): Promise<boolean | undefined> {
        try {
            const response = await this.getHttpClient()
                .post<{ validate: boolean }>(`${this.baseURL}/user/validate-credentials`, credentials);
            return response.data.validate;
        } catch (error: any) {
            error.response.data.errors.forEach((error: any) => {
                throw new HttpError(error.internalCode);
            });
        }
    }
}