import { BlackListedTokenEntity } from "../entities/black-listed-token.entity";
import { TokenEntity } from "../entities/token.entity";

export interface ApiGatewayRepository {
    getToken(token: string): Promise<TokenEntity | null>;
    add(token: TokenEntity): Promise<TokenEntity>; 
    destroy(token: string): Promise<Number>;
    getBlackListedToken(token: string): Promise<BlackListedTokenEntity | null>;
    addBlackListed(token: BlackListedTokenEntity): Promise<BlackListedTokenEntity>;
}