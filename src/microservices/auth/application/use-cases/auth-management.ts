import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { AuthEntity } from "../../../auth/domain/entities/auth.entity";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { UsersRepository } from "../../../users/user/domain/repositories/users.repository";
import { EncryptionService } from "../../../../lib-core/services/encryption.service";

config();

export class AuthManagement {

    private readonly _SECRET: string;
    private readonly _SESION_SG_EXP: number;

    constructor(
        private readonly _userRepository: UsersRepository,
        private readonly _encryptedService: EncryptionService,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_SG_EXP = Number(process.env.SESION_SG_EXP)!;
    }

    async authentication(auth: AuthEntity): Promise<{ token: string | null }> {
        try {
            const person = await this._userRepository.getUserByNickName(auth.nickname);
            if (!person?.user) throw new HttpError("010001");

            const decryptedPass = this._encryptedService.decrypt(person?.user.password);
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
}