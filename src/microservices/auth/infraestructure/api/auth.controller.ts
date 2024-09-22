import { Request, Response } from "express";

import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ErrorHandlerService } from "../../../../api-gateway/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";

export class AuthController {

    private readonly _SECRET: string;
    private readonly _SESION_MS_EXP: string;
    private readonly _authMiddleware: AuthMiddleware;
    private readonly _handlerError: ErrorHandlerService;

    constructor(
        private readonly _authManagement: AuthManagement,
        private readonly _redisClient: any,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_MS_EXP = process.env.SESION_MS_EXP!;
        this._authMiddleware = new AuthMiddleware(this._SECRET);
        this._handlerError = new ErrorHandlerService();
    }

    private async storeTokenInRedis(userId: string, token: string) {
        const expiryTime = Number(this._SESION_MS_EXP) / 1000;
        await this._redisClient.setEx(userId, expiryTime, token)
            .catch((err: any) => {
                throw new HttpError("000001");
            });
    }

    private async getTokenFromRedis(userId: string) {
        try {
            const token = await this._redisClient.get(userId);
            return token;
        } catch (err) {
            console.error('Error retrieving token from Redis:', err);
            throw new HttpError("000002");
        }
    }

    async authentication(req: Request, res: Response) {
        await this._authMiddleware.validateAuth(req, res, async () => {
            try {
                const { nickname } = req.body;
                const existingToken = await this.getTokenFromRedis(nickname);

                if (existingToken) {
                    return res.status(200).json({ token: existingToken });
                }

                const result = await this._authManagement.authentication(req.body);
                const token = result.token;

                await this.storeTokenInRedis(nickname, token!);

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

            const response = await this._redisClient.del(nickname)
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
