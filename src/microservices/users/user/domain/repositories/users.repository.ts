import { PersonModel } from "../../../person/infrastructure/models/person.model";
import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../../infrastructure/models/user.model";

export interface UsersRepository {
    add(user: UserEntity): Promise<UserModel>;
    edit(id: string, user: UserEntity): Promise<UserModel>;
    getUserByNickName(nickname: string): Promise<PersonModel | null>;
    getUserByEmail(email: string): Promise<PersonModel | null>;
}