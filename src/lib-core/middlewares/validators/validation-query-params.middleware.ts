import { NextFunction, Request, Response } from "express";

import { QueryParams } from "../../../lib-entities/query-params.entity";
import { BaseValidator } from "./validation.middleware";

export const queryValidationMiddleware = (
    validator: BaseValidator<any>,
    buildQueryParams: (data: any) => QueryParams
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.query;
        const { valid, errors } = validator.validate(data);

        if (!valid) {
            return res.status(400).json({ errors });
        }

        try {
            const queryParams = buildQueryParams(data);
            (req as any).queryParams = queryParams;
            next();
        } catch (error) {
            return res.status(400).json({ error: 'Invalid query parameters' });
        }
    };
};