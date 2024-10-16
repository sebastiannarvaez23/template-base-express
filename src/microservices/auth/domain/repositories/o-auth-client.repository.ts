import { OAuthClient } from "../entities/o-auth-client.model";

export interface IOAuthClientRepository {
    findByIdAndSecret(clientId: string, clientSecret: string): Promise<OAuthClient | null>;
}