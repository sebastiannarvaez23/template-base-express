import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export class AuthMiddleware {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public authenticateToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new HttpError("Token not provided", 401));
        }

        try {
            const payload = jwt.verify(token, this.secret) as JwtPayload;
            if (Date.now() > (payload.exp || 0)) {
                throw new HttpError("Token expired", 401);
            }
            req.user = payload;
            next();
        } catch (err) {
            next(new HttpError("Invalid token", 401));
        }
    };
}
