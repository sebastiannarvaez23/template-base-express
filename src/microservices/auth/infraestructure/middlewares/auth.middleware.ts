import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";
import { AuthValidator } from "../../application/validations/auth.validator";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export class AuthMiddleware {

    private secret: string;
    private authValidator;

    constructor(secret: string) {
        this.secret = secret;
        this.authValidator = new AuthValidator();
        this.validateAuth = validationMiddleware(this.authValidator);
    }

    public validateAuth;

    public authenticateToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new HttpError("Token not provided", 401, "000005"));
        }

        try {
            const payload = jwt.verify(token, this.secret) as JwtPayload;
            if (Date.now() > (payload.exp || 0)) {
                throw new HttpError("Token expired", 401, "000008");
            }
            req.user = payload;
            next();
        } catch (err) {
            next(new HttpError("Invalid token", 401, "000009"));
        }
    };
}
