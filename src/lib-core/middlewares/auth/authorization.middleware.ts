import { Request, Response, NextFunction } from "express";

import { HttpError } from "../../../api-gateway/domain/entities/error.entity";

export class AuthorizationMiddleware {
    constructor() { }

    checkAccess(serviceId: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;
            if (!user || !user.services) {
                return next(new HttpError("000010"));
            }
            const hasAccess = user.services.includes(serviceId);
            if (!hasAccess) {
                return next(new HttpError("000011"));
            }
            next();
        };
    }
}
