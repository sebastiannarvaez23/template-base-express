import { Request, Response } from "express";

import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ErrorHandlerService } from "../../../../lib-core/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { RedisConfig } from "../../../../config/redis";

export class AuthController {

    constructor(
        private readonly _authManagement: AuthManagement,
        private readonly _redis: RedisConfig,
        private readonly _authMiddleware: AuthMiddleware,
        private readonly _handlerError: ErrorHandlerService
    ) { }

    async authentication(req: Request, res: Response) {
        await this._authMiddleware.validateAuth(req, res, async () => {
            try {
                const { nickname } = req.body;
                const existingToken = await this._redis.getTokenFromRedis(nickname);

                if (existingToken) {
                    return res.status(200).json({ token: existingToken });
                }

                const result = await this._authManagement.authentication(req.body);
                const token = result.token;
                await this._redis.storeTokenInRedis(nickname, token!);
                res.status(200).json({ token });
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }

    async logout(req: Request, res: Response) {
        try {
            const authHeader = req.headers['authorization'];
            const { nickname } = req.body;

            if (!authHeader) throw new HttpError("000003");

            const token = authHeader.split(' ')[1];

            if (!token) throw new HttpError("000003");

            const response = await this._redis.deleteToken(nickname)
                .catch((err: any) => {
                    throw new HttpError("000004");
                });

            if (response === 1) {
                return res.status(200).json({ message: 'Logout successful' });
            } else throw new HttpError("000005");

        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
