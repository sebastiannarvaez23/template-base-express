import { PersonEntity } from "../entities/person.entity";
import { UserEntity } from "../entities/user.entity";

export interface UsersRepository {
    getList(): Promise<PersonEntity[]>;
    add(user: UserEntity): Promise<UserEntity>;
    edit(id: string, user: UserEntity): Promise<UserEntity[]>;
    getByNickname(nickname: string): Promise<UserEntity | null>;
    massCreation(data: UserEntity[]): Promise<UserEntity[]>;
}