import { UserModel } from "../../infrastructure/models/user.model";
import { UserEntity } from "../entities/user.entity";

export interface UsersRepository {
    add(user: UserEntity): Promise<UserModel>;
}