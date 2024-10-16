import { HttpError } from "../../api-gateway/domain/entities/error.entity";
import { RoleEntity } from "../../microservices/security/role/domain/entities/role.entity";

import { ClientFeignConfig } from "../config";

export class RoleClientFeign extends ClientFeignConfig {

    constructor() {
        super(process.env.OAUTH_CLIENT_ID!, process.env.OAUTH_CLIENT_SECRET!);
    }

    public async getPersonById(id: string): Promise<RoleEntity | undefined> {
        try {
            const response = await this.getHttpClient()
                .get<RoleEntity>(`${this.getBaseUrl()}/role/${id}`);
            return response.data;
        } catch (error: any) {
            error.response.data.errors.forEach((error: any) => {
                throw new HttpError(error.internalCode);
            });
        }
    }
}