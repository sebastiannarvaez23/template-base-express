import { config } from 'dotenv';

import { EncryptionService } from '../../../../api-gateway/services/encryption.service';
import { UserEntity } from "../../domain/entities/user.entity";
import { UsersRepository } from '../../domain/repositories/users.repository';

config();

export class UserManagement {

    private readonly _SECRET: string;
    private readonly _SESION_MS_EXP: number;

    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _encriptionService: EncryptionService,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_MS_EXP = Number(process.env.SESION_MS_EXP)!;
    }

    async add(user: UserEntity): Promise<UserEntity | null> {
        try {
            user.password = this._encriptionService.encrypt(user.password!);
            return await this._userRepository.add(user);
        } catch (e) {
            throw e;
        }
    }
}