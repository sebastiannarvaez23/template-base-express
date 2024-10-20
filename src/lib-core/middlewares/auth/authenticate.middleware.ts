import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthValidator } from "../../../microservices/auth/application/validations/auth.validator";
import { HttpError } from "../../../api-gateway/domain/entities/error.entity";
import { validationMiddleware } from "../validators/validation.middleware";
import { tokenManager } from "../../../microservices/auth/dependencies";

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

    constructor(
        _authValidator: AuthValidator
    ) {
        this.secret = process.env.SECRET_KEY!;
        this.authValidator = _authValidator;
    }

    public getValidateAuth() {
        return validationMiddleware(this.authValidator);
    }

    public authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const authHeader = req.headers.authorization;
            if (!authHeader) return next(new HttpError("000003"));

            const token = authHeader.split(" ")[1];
            if (!token) return next(new HttpError("000003"));

            req.user = await tokenManager.verifyToken(token, this.secret);
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