import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../models/user.model";

export interface UsersRepository {
    getUserPasswordByNickname(nickname: string): Promise<UserModel | null>;
    getByNickname(nickname: string): Promise<UserModel | null>;
    add(user: UserEntity): Promise<UserModel>;
    edit(id: string, user: UserEntity): Promise<UserModel>;
}