import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../../infrastructure/models/user.model";

export interface UsersRepository {
    getByNickname(nickname: string): Promise<UserModel | null>;
    add(user: UserEntity): Promise<UserModel>;
    edit(id: string, user: UserEntity): Promise<UserModel>;
}