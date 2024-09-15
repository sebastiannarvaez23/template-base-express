import { PersonModel } from "../models/person.model";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserMassModel, UserModel } from "../models/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    async getList(): Promise<UserModel[]> {
        try {
            const users = await UserModel.findAll({
                include: [
                    {
                        model: PersonModel,
                        as: "person",
                    },
                ],
                order: [["createdAt", "desc"]],
            });
            return users;
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async add(user: UserEntity): Promise<UserModel> {
        try {
            return await UserModel.create(user, {
                include: [
                    {
                        model: PersonModel,
                        as: "person",
                    },
                ],
            });

        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async edit(id: string, user: UserEntity): Promise<UserModel[]> {
        try {
            const [affectRows, editedUser] = await UserModel.update(user, { where: { id: id }, returning: true });

            return editedUser;
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async getByNickname(nickname: string): Promise<UserModel | null> {
        try {
            return await UserModel.scope("withPassword").findOne({ where: { nickname } });
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async massCreation(data: UserEntity[]): Promise<UserEntity[]> {
        try {
            const result = await UserMassModel.bulkCreate(data,
                {
                    updateOnDuplicate: [
                        "email", "numberPhone"
                    ]
                }
            );

            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}