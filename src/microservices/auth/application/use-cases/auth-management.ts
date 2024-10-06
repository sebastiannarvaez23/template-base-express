import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { AuthEntity } from "../../../auth/domain/entities/auth.entity";
import { EncryptionUtil } from "../../../../lib-core/utils/encryption.util";
import { generateResetToken } from "../../../../lib-core/utils/token-generator.util";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { RedisConfig } from "../../../../config/redis";
import { sendPasswordResetEmail } from "../../../../lib-core/utils/mailer.util";
import { UsersRepository } from "../../../users/user/domain/repositories/users.repository";

config();

export class AuthManagement {

    private readonly _SECRET: string;
    private readonly _SESION_SG_EXP: number;

    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _encryptedUtils: EncryptionUtil,
        private readonly _redis: RedisConfig,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_SG_EXP = Number(process.env.SESION_SG_EXP)!;
    }

    async authentication(auth: AuthEntity): Promise<{ token: string | null }> {
        try {
            const person = await this._userRepository.getUserByNickName(auth.nickname);
            if (!person?.user) throw new HttpError("010001");

            const decryptedPass = this._encryptedUtils.decrypt(person?.user.password);
            if (decryptedPass !== auth.password) throw new HttpError("010002");

            const role = person.role.name;
            const services = person.role.services.map((service: any) => service.code);

            const token = jwt.sign({
                sub: person.user.id,
                name: person.user.nickname,
                role: role,
                services: services,
                exp: Date.now() + this._SESION_SG_EXP * 1000,
            }, this._SECRET);

            return { token };

        } catch (e) {
            throw e;
        }
    }

    async requestPasswordReset(email: string): Promise<{ message: string | null }> {
        try {
            const user = await this._userRepository.getUserByEmail(email);
            if (!user) throw new HttpError("010001");
            const resetToken = generateResetToken();
            await this._redis.storeResetPassToken(resetToken, user.id);
            await sendPasswordResetEmail(user.email, resetToken);
            return { message: "Mail have sent correctly. Review your inbox." };
        } catch (e) {
            throw e;
        }
    }

    async passwordReset(token: string, newPassword: string): Promise<{ message: string }> {
        try {

            const nickname = await this._redis.getResetPassTokenFromRedis(token);
            if (!nickname) throw new HttpError("000013");

            const person = await this._userRepository.getUserByNickName(nickname);
            if (!person) throw new HttpError("000014");

            const hashedPassword = await this._encryptedUtils.encrypt(newPassword);

            person.user.password = hashedPassword;
            await this._userRepository.edit(person.user.id, person.user);
            await this._redis.deleteResetPassToken(token);
            return { message: "The password has been reset successfully." };
        } catch (error) {
            throw error;
        }
    }
}