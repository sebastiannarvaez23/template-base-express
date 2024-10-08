import { PersonEntity } from "../../microservices/users/person/domain/entities/person.entity";
import { ClientFeignConfig } from "../config";

export class PersonClientFeign extends ClientFeignConfig {

    private baseURL: string;

    constructor() {
        super();
        this.baseURL = "http://localhost:3000/api/v1";
    }

    public async getPersonByNickname(nickname: string): Promise<PersonEntity> {
        const response = await this.getHttpClient()
            .get<PersonEntity>(`${this.baseURL}/person/by-nickname/${nickname}`);
        return response.data;
    }

    public async getPersonByEmail(email: string): Promise<PersonEntity> {
        const response = await this.getHttpClient()
            .get<PersonEntity>(`${this.baseURL}/person/by-email/${email}`);
        return response.data;
    }
}