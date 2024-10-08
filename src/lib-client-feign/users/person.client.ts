import { PersonEntity } from "../../microservices/users/person/domain/entities/person.entity";
import { ClientFeignConfig } from "../config";

export class PersonClientFeign extends ClientFeignConfig {

    constructor() {
        super();
    }

    public async getPersonByNickname(nickname: string): Promise<PersonEntity> {
        const response = await this.getHttpClient()
            .get<PersonEntity>(`${this.getBaseUrl()}/person/by-nickname/${nickname}`);
        return response.data;
    }

    public async getPersonByEmail(email: string): Promise<PersonEntity> {
        const response = await this.getHttpClient()
            .get<PersonEntity>(`${this.getBaseUrl()}/person/by-email/${email}`);
        return response.data;
    }
}