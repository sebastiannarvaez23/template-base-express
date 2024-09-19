import { Request, Response } from "express";

import { ErrorHandlerService } from "../../../users/services/error-handler.service";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthController {

    private readonly _SECRET: string;
    private readonly _authMiddleware: AuthMiddleware;
    private readonly _handlerError: ErrorHandlerService;

    constructor(
        private readonly _authManagement: AuthManagement,
    ) {
        this._SECRET = process.env.SECRET_KEY!;
        this._authMiddleware = new AuthMiddleware(this._SECRET);
        this._handlerError = new ErrorHandlerService();
    }

    async authentication(req: Request, res: Response) {
        await this._authMiddleware.validateAuth(req, res, async () => {
            try {
                const result = await this._authManagement.authentication(req.body);
                res.status(200).json(result);
            } catch (error) {
                this._handlerError.handle(error as HttpError | Error, req, res);
            }
        });
    }
}
