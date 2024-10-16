import { Request, Response } from "express";

import { AuthManagement } from "../../application/use-cases/auth-management";
import { AuthMiddleware } from "../../../../lib-core/middlewares/auth/authenticate.middleware";
import { ErrorHandlerUtil } from "../../../../lib-core/utils/error-handler.util";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";

export class AuthController {

    constructor(
        private readonly _authManagement: AuthManagement,
        private readonly _authMiddleware: AuthMiddleware,
        private readonly _handlerError: ErrorHandlerUtil,
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
            await this._authManagement.logout(authHeader, nickname);
            return res.status(200).json({ message: 'Logout successful' });
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

    async generateOAuth2Token(req: Request, res: Response) {
        try {
            const { client_id, client_secret } = req.body;

            if (!client_id || !client_secret) {
                res.status(400).json({ error: "invalid_request", message: "client_id and client_secret are required." });
                return;
            }
            const token = await this._authManagement.generateOAuth2Token(client_id, client_secret);
            res.status(200).json({
                access_token: token,
                token_type: "Bearer",
                expires_in: Number(process.env.TOKEN_EXPIRY_SECONDS) || 3600,
            });

        } catch (error) {
            this._handlerError.handle(error as HttpError | Error, req, res);
        }
    }

    private getExpiryInSeconds(): number {
        const expiry = process.env.TOKEN_EXPIRY || "1h";
        const match = expiry.match(/(\d+)([smhd])/);
        if (!match) return 3600;
        const value = parseInt(match[1]);
        const unit = match[2];
        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 3600;
            case 'd':
                return value * 86400;
            default:
                return 3600;
        }
    }
}