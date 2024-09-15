import { BlackListedTokenEntity } from "../../domain/entities/black-listed-token.entity";
import { TokenEntity } from "../../domain/entities/token.entity";
import { ApiGatewayRepository } from "../../domain/repositories/api-gateway.repository";
import { BlackListedTokenModel } from "../models/black-listed-token.model";
import { TokenModel } from "../models/token.model";

export class ApiGatewayRepositoryImpl implements ApiGatewayRepository {
  async getToken(token: string): Promise<TokenModel | null> {
    try {
      return await TokenModel.findOne({
        where: { token },
      });
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }

  async add(token: TokenEntity): Promise<TokenEntity> {
    try {
      return await TokenModel.create(token);
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }

  async destroy(token: string): Promise<Number> {
    try {
      return await TokenModel.destroy({
        where: { token: token },
      });
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }

  async addBlackListed(
    token: BlackListedTokenEntity
  ): Promise<BlackListedTokenEntity> {
    try {
      return await BlackListedTokenModel.create(token);
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }

  async getBlackListedToken(
    token: string
  ): Promise<BlackListedTokenEntity | null> {
    try {
      return await BlackListedTokenModel.findOne({
        where: { token },
      });
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }
}
