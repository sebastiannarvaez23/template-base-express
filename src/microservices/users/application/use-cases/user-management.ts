import { config } from 'dotenv';

import { UserEntity } from "../../domain/entities/user.entity";
import { UsersRepository } from '../../domain/repositories/users.repository';

config();

export class UserManagement {
    constructor(
        private readonly _userRepository: UsersRepository
    ) { }

    async get(id: string): Promise<UserEntity | null> {
        try {
            return await this._userRepository.get(id);
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async add(user: UserEntity): Promise<UserEntity | null> {
        try {
            return await this._userRepository.add(user);
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }

    async delete(id: string): Promise<UserEntity | null> {
        try {
            const resultUser = await this._userRepository.delete(id);
            return resultUser;
        } catch (e) {
            console.debug(e)
            throw e;
        }
    }
}