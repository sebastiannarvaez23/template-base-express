import { NextFunction, Request, Response } from "express";

import { QueryParams } from "../../../lib-entities/core/query-params.entity";
import { BaseValidator } from "./validation.middleware";

export class QueryParamsMiddleware {
    queryValidationMiddleware = (
        validator: BaseValidator<any>,
        buildQueryParams: (data: any) => QueryParams
    ) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const data = req.query;
            const { valid, errors } = validator.validate(data);

            if (!valid) {
                return res.status(400).json({ errors }); // TODO: http error con internal code
            }

            try {
                const queryParams = buildQueryParams(data);
                (req as any).queryParams = queryParams;
                next();
            } catch (error) {
                return res.status(400).json({ error: 'Invalid query parameters' }); // TODO: http error con internal code
            }
        };
    };
}
