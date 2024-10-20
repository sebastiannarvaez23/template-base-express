import { HttpError } from "../../api-gateway/domain/entities/error.entity";
import { PersonEntity } from "../../lib-entities/users/person.entity";
import { ClientFeignConfig } from "../config";

export class PersonClientFeign extends ClientFeignConfig {

    constructor() {
        super(process.env.USERS_OAUTH_CLIENT_ID!, process.env.USERS_CLIENT_SECRET!);
    }

    public async getPersonByNickname(nickname: string): Promise<PersonEntity | undefined> {
        try {
            const response = await this.getHttpClient()
                .get<PersonEntity>(`${this.getBaseUrl()}/person/by-nickname/${nickname}`);
            return response.data;
        } catch (error: any) {
            error.response.data.errors.forEach((error: any) => {
                throw new HttpError(error.internalCode);
            });
        }
    }

    public async getPersonByEmail(email: string): Promise<PersonEntity | undefined> {
        try {
            const response = await this.getHttpClient()
                .get<PersonEntity>(`${this.getBaseUrl()}/person/by-email/${email}`);
            return response.data;
        } catch (error: any) {
            error.response.data.errors.forEach((error: any) => {
                throw new HttpError(error.internalCode);
            });
        }
    }
}