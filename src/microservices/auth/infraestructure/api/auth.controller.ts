import { Request, Response } from "express";

import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../../../../lib-core/middlewares/auth/authenticate.middleware";
import { ErrorHandlerUtil } from "../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { RedisConfig } from "../../../../config/redis";

export class AuthController {

    constructor(
        private readonly _authManagement: AuthManagement,
        private readonly _redis: RedisConfig,
        private readonly _authMiddleware: AuthMiddleware,
        private readonly _handlerError: ErrorHandlerUtil
    ) { }

    async authentication(req: Request, res: Response) {
        await this._authMiddleware.getValidateAuth()(req, res, async () => {
            try {
                const token = await this._authManagement.authentication(req.body);
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

    async requestPasswordReset(req: Request, res: Response) {
        try {
            const { email } = req.body;
            res.status(200).json(await this._authManagement.requestPasswordReset(email));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    async passwordReset(req: Request, res: Response) {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            res.status(200).json(await this._authManagement.passwordReset(token, newPassword));
        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}