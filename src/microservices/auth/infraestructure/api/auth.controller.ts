import { Request, Response } from "express";
import { ErrorHandlerService } from "../../../users/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { createClient } from 'redis';

export class AuthController {

    private readonly _SECRET: string;
    private readonly _authMiddleware: AuthMiddleware;
    private readonly _handlerError: ErrorHandlerService;
    private readonly _redisClient;

    constructor(private readonly _authManagement: AuthManagement) {
        this._SECRET = process.env.SECRET_KEY!;
        this._authMiddleware = new AuthMiddleware(this._SECRET);
        this._handlerError = new ErrorHandlerService();

        this._redisClient = createClient({
            url: 'redis://localhost:6379',
        });

        this._redisClient.connect().catch(console.error);
    }

    private async storeTokenInRedis(token: string) {
        const expiryTime = 3600;
        await this._redisClient.setEx(token, expiryTime, JSON.stringify({ valid: true }))
            .catch(err => {
                console.error('Error storing the token in Redis:', err);
                throw new HttpError("Error storing the token", 500);
            });
    }

    async authentication(req: Request, res: Response) {
        await this._authMiddleware.validateAuth(req, res, async () => {
            try {
                const result = await this._authManagement.authentication(req.body);
                const token = result.token;
                await this.storeTokenInRedis(token!);

                res.status(200).json(result);
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }

    async logout(req: Request, res: Response) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) throw new HttpError('No token provided', 400)
            const token = authHeader.split(' ')[1];
            if (!token) throw new HttpError('Token not found', 400);

            const response = await this._redisClient.del(token).catch(err => {
                console.error('Error deleting the token from Redis:', err);
                throw new HttpError('Error deleting the token', 500);
            });

            if (response === 1) {
                return res.status(200).json({ message: 'Logout successful' });
            } else throw new HttpError('Token not found', 404);

        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }
}
