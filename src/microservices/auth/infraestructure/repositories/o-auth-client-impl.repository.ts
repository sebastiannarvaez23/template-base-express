import { OAuthClient } from "../../domain/entities/o-auth-client.model";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";

export interface IOAuthClientRepository {
    findByIdAndSecret(clientId: string, clientSecret: string): Promise<OAuthClient | null>;
}

export class OAuthClientRepository implements IOAuthClientRepository {

    constructor() { }

    public async findByIdAndSecret(clientId: string, clientSecret: string): Promise<OAuthClient | null> {
        try {
            const client = await OAuthClient.findOne({
                where: {
                    id: clientId,
                    secret: clientSecret,
                },
            });
            return client;
        } catch (error) {
            console.error("Error en OAuthClientRepository:", error);
            throw new HttpError("000000");
        }
    }
}
