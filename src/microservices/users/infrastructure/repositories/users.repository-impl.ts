import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../models/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    async add(user: UserEntity): Promise<UserModel> {
        try {
            return await UserModel.create(user as Optional<any, string>);
        } catch (error) {
            console.debug(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("An unexpected error occurred.", 500, "000000");
        }
    }

    async getUserByNickName(nickname: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne({ where: { nickname } });
        } catch (error) {
            console.debug(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("An unexpected error occurred.", 500, "000000");
        }
    }
}