import { config } from "dotenv";

import { EncryptionUtil } from "../../../../../lib-core/utils/encryption.util";
import { UserEntity } from "../../domain/entities/user.entity";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { HttpError } from "../../../../../api-gateway/domain/entities/error.entity";

config();

export class UserManagement {

    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _encriptionService: EncryptionUtil,
    ) { }

    async add(user: UserEntity): Promise<UserEntity | null> {
        try {
            user.password = this._encriptionService.encrypt(user.password!);
            return await this._userRepository.add(user);
        } catch (e) {
            throw e;
        }
    }

    async validateCredential({ nickname, password }: Partial<UserEntity>): Promise<boolean> {
        try {
            const user = await this._userRepository.getByNickname(nickname!);
            if (!user) throw new HttpError("010001");
            const decriptedPass = this._encriptionService.decrypt(user.password);
            return (password === decriptedPass);
        } catch (e) {
            throw e;
        }
    }
}