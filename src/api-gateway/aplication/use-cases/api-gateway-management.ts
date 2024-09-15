import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenEntity } from "../../domain/entities/token.entity";
import { ApiGatewayRepository } from "../../domain/repositories/api-gateway.repository";
import { TokenResponseEntity } from "../../domain/entities/token-response.entity";
import { BlackListedTokenEntity } from "../../domain/entities/black-listed-token.entity";

export class ApiGatewayManagement {
  private JWT_SECRET = process.env.SECRET_KEY || "secret";
  private JWT_EXPIRES_IN = "15m";
  private REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60;

  constructor(private readonly _repository: ApiGatewayRepository) {}

  async createTokens(userId: string): Promise<TokenResponseEntity> {
    const accessToken = jwt.sign({ userId }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
    const newTokenRefresh: TokenEntity = {
      userId: userId,
      expiryDt: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRES_IN * 1000),
      active: 1,
      userReg: "System",
    };
    const refresh = await this._repository.add(newTokenRefresh);
    const response: TokenResponseEntity = {
      token: accessToken,
      refresh_token: refresh.token,
    };
    return response;
  }

  async refreshToken(oldRefreshToken: string) {
    const tokenData = await this._repository.getToken(oldRefreshToken);

    if (!tokenData || tokenData.expiryDt < new Date()) {
      return { error: "Token inválido o expirado" };
    }
    const response = await this.createTokens(tokenData.userId!);
    await this._repository.destroy(oldRefreshToken);

    return response;
  }

  async invalidateToken(token: string, oldRefreshToken: string) {
    const decodedToken = jwt.verify(token, this.JWT_SECRET);
    const { userId, exp } = decodedToken as JwtPayload;
    const newBlackToken: BlackListedTokenEntity = {
      token: token,
      userId: userId,
      expiryDt: new Date(exp! * 1000), // Tiempo de expiración del token
    };
    await this._repository.destroy(oldRefreshToken);
    return await this._repository.addBlackListed(newBlackToken);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklisted = await this._repository.getBlackListedToken(token);
    return !!blacklisted;
  }
}
