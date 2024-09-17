import { UserEntity } from "../entities/user.entity";

export interface UsersRepository {
    get(id: string): Promise<UserEntity | null>;
    add(user: UserEntity): Promise<UserEntity>;
    delete(id: string): Promise<UserEntity>;
}