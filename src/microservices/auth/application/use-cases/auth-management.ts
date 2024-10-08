import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { AuthEntity } from "../../../auth/domain/entities/auth.entity";
import { EncryptionUtil } from "../../../../lib-core/utils/encryption.util";
import { generateResetToken } from "../../../../lib-core/utils/token-generator.util";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { PersonClientFeign } from "../../../../lib-client-feign/users/person.client";
import { RedisConfig } from "../../../../config/redis";
import { sendPasswordResetEmail } from "../../../../lib-core/utils/mailer.util";
import { PersonEntity } from "../../../users/person/domain/entities/person.entity";
import { UserClientFeign } from "../../../../lib-client-feign/users/users.client";

config();

export class AuthManagement {

    private readonly _SECRET: string;
    private readonly _SESION_SG_EXP: number;

    constructor(
        private readonly _encryptedUtils: EncryptionUtil,
        private readonly _redis: RedisConfig,
        private readonly _personClientFeign: PersonClientFeign,
        private readonly _userClientFeign: UserClientFeign,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_SG_EXP = Number(process.env.SESION_SG_EXP)!;
    }

    async authentication(credentials: AuthEntity): Promise<string | undefined> {
        try {
            const validateCredentials: boolean | undefined = await this._userClientFeign.validateCredential(credentials);
            if (!validateCredentials) throw new HttpError("010002");

            const existingToken = await this._redis.getTokenFromRedis(credentials.nickname);
            if (existingToken) return existingToken;

            const person: PersonEntity | undefined = await this._personClientFeign.getPersonByNickname(credentials.nickname);
            if (!person?.user) throw new HttpError("010001");

            const role = person.role!.name;
            const services = person.role!.services!.map((service: any) => service.code);

            const token = jwt.sign({
                sub: person.user.id,
                name: person.user.nickname,
                role: role,
                services: services,
                exp: Date.now() + this._SESION_SG_EXP * 1000,
            }, this._SECRET);
            await this._redis.storeTokenInRedis(credentials.nickname, token!);
            return token;
        } catch (e) {
            throw e;
        }
    }

    async logout(authHeader: string | undefined, nickname: string): Promise<boolean> {
        try {
            if (!authHeader) throw new HttpError("000003");
            const token = authHeader.split(' ')[1];
            if (!token) throw new HttpError("000003");
            const response = await this._redis.deleteToken(nickname)
                .catch((err: any) => {
                    throw new HttpError("000004");
                });
            if (response !== 1) throw new HttpError("000005");
            return true;
        } catch (e) {
            throw e;
        }
    }

    async requestPasswordReset(email: string): Promise<{ message: string | null }> {
        try {
            const user = await this._personClientFeign.getPersonByEmail(email);
            if (!user) throw new HttpError("010001");
            const resetToken = generateResetToken();
            await this._redis.storeResetPassToken(resetToken, user.id!);
            await sendPasswordResetEmail(user.email!, resetToken);
            return { message: "Mail have sent correctly. Review your inbox." };
        } catch (e) {
            throw e;
        }
    }

    async passwordReset(token: string, newPassword: string): Promise<{ message: string }> {
        try {

            const nickname = await this._redis.getResetPassTokenFromRedis(token);
            if (!nickname) throw new HttpError("000013");

            const person: PersonEntity | undefined = await this._personClientFeign.getPersonByNickname(nickname);
            if (!person) throw new HttpError("000014");

            const hashedPassword = await this._encryptedUtils.encrypt(newPassword);

            person.user!.password = hashedPassword;
            await this._userClientFeign.edit(person.user!.id!, person.user!);
            await this._redis.deleteResetPassToken(token);
            return { message: "The password has been reset successfully." };
        } catch (error) {
            throw error;
        }
    }
}