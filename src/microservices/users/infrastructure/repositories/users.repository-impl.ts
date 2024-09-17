import { UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../models/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    async get(id: string): Promise<UserEntity | null> {
        try {
            const user = await UserModel.findOne({ where: { id } });
            if (!user) {
                throw new HttpError('User not found', 404);
            }
            return user;
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }

    async add(user: UserEntity): Promise<UserEntity> {
        try {
            return (await UserModel.create(user));
        } catch (error) {
            console.debug(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("An unexpected error occurred.", 500);
        }
    }

    async delete(id: string): Promise<UserEntity> {
        try {
            const userToDelete = await UserModel.findOne({
                where: { id: id }
            });
            if (!userToDelete) {
                throw new HttpError('User not found', 404);
            }
            await userToDelete.destroy();
            return userToDelete;
        } catch (error) {
            console.debug(error);
            throw error;
        }
    }
}