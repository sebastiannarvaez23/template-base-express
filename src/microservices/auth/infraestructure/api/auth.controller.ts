import { createClient } from 'redis';
import { Request, Response } from "express";

import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ErrorHandlerService } from "../../../users/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";

export class AuthController {

    private readonly _SECRET: string;
    private readonly _SESION_MS_EXP: string;
    private readonly _authMiddleware: AuthMiddleware;
    private readonly _handlerError: ErrorHandlerService;
    private readonly _redisClient;

    constructor(private readonly _authManagement: AuthManagement) {
        this._SECRET = process.env.SECRET_KEY!;
        this._SESION_MS_EXP = process.env.SESION_MS_EXP!;
        this._authMiddleware = new AuthMiddleware(this._SECRET);
        this._handlerError = new ErrorHandlerService();

        this._redisClient = createClient({
            url: 'redis://localhost:6379',
        });

        this._redisClient.connect().catch(console.error);
    }

    private async storeTokenInRedis(userId: string, token: string) {
        const expiryTime = Number(this._SESION_MS_EXP) / 1000;
        await this._redisClient.setEx(userId, expiryTime, token).catch(err => {
            console.error('Error storing the token in Redis:', err);
            throw new HttpError("Error storing the token", 500, "000003");
        });
    }

    private async getTokenFromRedis(userId: string) {
        const token = await this._redisClient.get(userId).catch(err => {
            console.error('Error retrieving the token from Redis:', err);
            throw new HttpError("Error retrieving the token", 500, "000004");
        });
        return token;
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

            if (!authHeader) throw new HttpError('No token provided', 400, "000005");

            const token = authHeader.split(' ')[1];

            if (!token) throw new HttpError('No token provided', 400, "000005");

            const response = await this._redisClient.del(nickname).catch(err => {
                console.error('Error deleting the token from Redis:', err);
                throw new HttpError('Error deleting the token', 500, "000006");
            });

            if (response === 1) {
                return res.status(200).json({ message: 'Logout successful' });
            } else throw new HttpError('Token not found', 404, "000007");

        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
