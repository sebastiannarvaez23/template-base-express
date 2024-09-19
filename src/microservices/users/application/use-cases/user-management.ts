import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import { UserEntity } from "../../domain/entities/user.entity";
import { UsersRepository } from '../../domain/repositories/users.repository';
import { AuthEntity } from '../../../auth/domain/entities/auth.entity';
import { HttpError } from '../../../../api-gateway/domain/entities/error.entity';

config();

export class UserManagement {

    private readonly _SECRET: string;
    private readonly _SESION_MS_EXP: number;

    constructor(
        private readonly _userRepository: UsersRepository,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_MS_EXP = Number(process.env.SESION_MS_EXP)!;
    }

    async add(user: UserEntity): Promise<UserEntity | null> {
        try {
            return await this._userRepository.add(user);
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }
}