import { Optional, UniqueConstraintError } from "sequelize";

import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";
import { PersonModel } from "../../../person/infrastructure/models/person.model";
import { RoleModel } from "../../../../security/role/infraestructure/models/role.model";
import { ServiceModel } from "../../../../security/service/infraestructure/models/service.model";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserModel } from "../models/user.model";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    async add(user: UserEntity): Promise<UserModel> {
        try {
            return await UserModel.create(user as Optional<any, string>);
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }

    async getUserByNickName(nickname: string): Promise<PersonModel | null> {
        try {
            return await PersonModel.findOne({
                include: [
                    {
                        model: UserModel,
                        where: { nickname },
                    },
                    {
                        model: RoleModel,
                        include: [
                            {
                                model: ServiceModel,
                                through: {
                                    attributes: []
                                }
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            console.error(error);
            if (error instanceof UniqueConstraintError) {
                throw error;
            }
            throw new HttpError("000000");
        }
    }
}