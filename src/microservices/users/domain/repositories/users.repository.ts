import { PersonModel } from "../../infrastructure/models/person.model";
import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../../infrastructure/models/user.model";

export interface UsersRepository {
    add(user: UserEntity): Promise<UserModel>;
    getUserByNickName(nickname: string): Promise<PersonModel | null>;
}