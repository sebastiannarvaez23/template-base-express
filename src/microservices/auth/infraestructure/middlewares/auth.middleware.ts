import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validators/validation.middleware";
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
    private redis: any;

    constructor(
        _secret: string,
        _redis: any
    ) {
        this.secret = _secret;
        this.redis = _redis;
        this.authValidator = new AuthValidator();
        this.validateAuth = validationMiddleware(this.authValidator);
    }

    public validateAuth;

    public authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new HttpError("000003"));
        }

        try {
            const payload = jwt.verify(token, this.secret) as JwtPayload;
            console.log({ payload });

            if (Date.now() > (payload.exp || 0)) {
                return next(new HttpError("000006"));
            }
            const nickname = payload.name;
            const storedToken = await this.redis.getTokenFromRedis(nickname);
            console.log({ storedToken, token });
            if (storedToken !== token) {
                return next(new HttpError("000007"));
            }
            req.user = payload;
            next();
        } catch (err) {
            console.log({ err });
            if (err instanceof jwt.JsonWebTokenError) {
                return next(new HttpError("000007"));
            }
            return next(new HttpError("000000"));
        }
    };
}
