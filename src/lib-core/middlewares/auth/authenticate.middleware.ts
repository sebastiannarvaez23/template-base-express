import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthValidator } from "../validators/auth.validator";
import { HttpError } from "../../utils/error.util";
import { validationDataMiddleware } from "../validators/validation.middleware";
import { TokenManager } from "../../utils/token-manager.util";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export class AuthMiddleware {

    private secret: string;
    private authValidator: AuthValidator;
    private tokenManager: TokenManager;

    constructor(
        _authValidator: AuthValidator,
        _tokenManager: TokenManager
    ) {
        this.secret = process.env.SECRET_KEY!;
        this.authValidator = _authValidator;
        this.tokenManager = _tokenManager;
    }

    public getValidateAuth() {
        return validationDataMiddleware(this.authValidator);
    }

    public authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const authHeader = req.headers.authorization;
            if (!authHeader) return next(new HttpError("000003"));

            const token = authHeader.split(" ")[1];
            if (!token) return next(new HttpError("000003"));

            req.user = await this.tokenManager.verifyToken(token, this.secret);
            next();
        } catch (err: any) {
            console.error({ err });
            if (err instanceof jwt.JsonWebTokenError) {
                return next(new HttpError("000007"));
            }
            if (err instanceof HttpError) {
                return next(err);
            }
            return next(new HttpError("000000"));
        }
    };
}