import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthValidator } from "../../application/validations/auth.validator";
import { HttpError } from "../../../../api-gateway/domain/entities/error.entity";
import { RedisConfig } from "../../../../config/redis";
import { validationMiddleware } from "../../../../lib-core/middlewares/validators/validation.middleware";

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
    private redis: RedisConfig;

    constructor(
        _secret: string,
        _redis: RedisConfig,
        _authValidator: AuthValidator
    ) {
        this.secret = _secret;
        this.redis = _redis;
        this.authValidator = _authValidator;
        this.validateAuth = validationMiddleware(this.authValidator);
    }

    public validateAuth;

    public authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return next(new HttpError("000003"));
        try {
            const payload = jwt.verify(token, this.secret) as JwtPayload;
            if (Date.now() > (payload.exp || 0)) return next(new HttpError("000006"));
            const nickname = payload.name;
            const storedToken = await this.redis.getTokenFromRedis(nickname);
            if (storedToken !== token) return next(new HttpError("000007"));
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
