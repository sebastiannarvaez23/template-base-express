import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import { AuthEntity } from '../../../auth/domain/entities/auth.entity';
import { HttpError } from '../../../../api-gateway/domain/entities/error.entity';
import { UsersRepository } from '../../../users/domain/repositories/users.repository';

config();

export class AuthManagement {

    private readonly _SECRET: string;
    private readonly _SESION_MS_EXP: number;

    constructor(
        private readonly _userRepository: UsersRepository,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_MS_EXP = Number(process.env.SESION_MS_EXP)!;
    }

    async authentication(auth: AuthEntity): Promise<{ token: string | null }> {
        try {
            const user = await this._userRepository.getUserByNickName(auth.nickname);
            if (!user) throw new HttpError("010001");
            if (user.password !== auth.password) throw new HttpError("010002");

            const token = jwt.sign({
                sub: user.id,
                name: user.nickname,
                exp: Date.now() + 60 * this._SESION_MS_EXP
            }, this._SECRET);

            return await { token };
        } catch (e) {
            console.debug(e);
            throw e;
        }
    }
}