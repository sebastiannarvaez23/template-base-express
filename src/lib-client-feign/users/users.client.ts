import { AuthEntity } from "../../microservices/auth/domain/entities/auth.entity";
import { ClientFeignConfig } from "../config";
import { HttpError } from "../../api-gateway/domain/entities/error.entity";
import { UserEntity } from "../../microservices/users/user/domain/entities/user.entity";

export class UserClientFeign extends ClientFeignConfig {

    constructor() {
        super(process.env.USERS_OAUTH_CLIENT_ID!, process.env.USERS_CLIENT_SECRET!);
    }

    public async edit(userId: string, user: UserEntity): Promise<UserEntity | undefined> {
        try {
            const response = await this.getHttpClient()
                .put<UserEntity>(`${this.getBaseUrl()}/user/${userId}`, user);
            return response.data;
        } catch (error: any) {
            error.response.data.errors.forEach((error: any) => {
                throw new HttpError(error.internalCode);
            });
        }
    }

    public async validateCredential(credentials: AuthEntity): Promise<boolean | undefined> {
        try {
            const response = await this.getHttpClient()
                .post<{ validate: boolean }>(`${this.getBaseUrl()}/user/validate-credentials`, credentials);
            return response.data.validate;
        } catch (error: any) {
            error.response.data.errors.forEach((error: any) => {
                throw new HttpError(error.internalCode);
            });
        }
    }
}