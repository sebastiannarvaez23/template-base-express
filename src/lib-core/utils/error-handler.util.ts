import { Request, Response } from "express";
import { UniqueConstraintError, ValidationErrorItem, DatabaseError, ForeignKeyConstraintError } from "sequelize";

import { HttpError } from "./error.util";

export class ErrorHandlerUtil {
    handle(err: HttpError | Error, req: Request, res: Response) {
        console.error('Error caught by ErrorHandlerUtil:', err);

        if (err instanceof UniqueConstraintError) {
            const errors = err.errors.reduce((acc: { [key: string]: string[] | string }, e: ValidationErrorItem) => {
                const field = e.path || 'unknown';
                if (!acc[field]) acc[field] = [];
                (acc[field] as string[]).push('Must be unique');
                return acc;
            }, {});

            const httpError = new HttpError("000009");
            return res.status(httpError.statusCode).json({
                data: null,
                errors: {
                    internalCode: httpError.internalCode,
                    message: httpError.message,
                    details: errors
                }
            });
        }

        if (err instanceof ForeignKeyConstraintError) {
            const parts = err.index ? err.index.split('_') : [];
            const field = parts.length > 1 ? parts.slice(1).join('_') : 'unknown';
            const errors = {
                [field]: ["The provided foreign key does not exist"]
            };

            const httpError = new HttpError("000012");
            return res.status(httpError.statusCode).json({
                data: null,
                errors: {
                    internalCode: httpError.internalCode,
                    message: "Foreign key violation on field: " + field,
                    details: errors
                }
            });
        }

        if (err instanceof DatabaseError) {
            const errorCode = (err.original as any).code;

            let httpError: HttpError;
            if (errorCode === '22P02') {
                httpError = new HttpError("000008");
            } else {
                httpError = new HttpError("000009");
            }

            return res.status(httpError.statusCode).json({
                data: null,
                errors: {
                    internalCode: httpError.internalCode,
                    message: httpError.message
                }
            });
        }

        if (err instanceof HttpError) {
            return res.status(err.statusCode).json({
                data: null,
                errors: {
                    internalCode: err.internalCode,
                    message: err.message
                }
            });
        }

        const genericError = new HttpError("000000");
        return res.status(genericError.statusCode).json({
            data: null,
            errors: {
                internalCode: genericError.internalCode,
                message: genericError.message
            }
        });
    }
}
