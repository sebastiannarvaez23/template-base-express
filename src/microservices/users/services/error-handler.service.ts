import { HttpError } from '../../../api-gateway/domain/entities/error.entity';
import { Request, Response } from 'express';
import { UniqueConstraintError, ValidationErrorItem, DatabaseError } from 'sequelize';

export class ErrorHandlerService {
    handle(err: HttpError | Error, req: Request, res: Response) {
        console.error('Error caught by ErrorHandlerService:', err);

        if (err instanceof UniqueConstraintError) {
            const errors = err.errors.reduce((acc: { [key: string]: string[] | string }, e: ValidationErrorItem) => {
                acc["internalCode"] = "000000";
                const field = e.path || 'unknown';
                if (!acc[field]) acc[field] = [];
                (acc[field] as string[]).push('Must be unique.');
                return acc;
            }, {});

            return res.status(400).json({
                data: null,
                errors
            });
        }

        if (err instanceof DatabaseError) {
            const errorCode = (err.original as any).code;

            if (errorCode === '22P02') {
                return res.status(400).json({
                    data: null,
                    errors: [{
                        internalCode: "000001",
                        message: 'Invalid UUID format.'
                    }]
                });
            }

            return res.status(500).json({
                data: null,
                errors: [{
                    internalCode: "000002",
                    message: 'Database error occurred.'
                }]
            });
        }

        if (err instanceof HttpError) {
            return res.status(err.statusCode).json({
                data: null,
                errors: [{
                    internalCode: err.internalCode,
                    message: err.message
                }]
            });
        }

        return res.status(500).json({
            data: null,
            errors: [{
                internalCode: "000000",
                message: "An unexpected error occurred."
            }]
        });
    }
}
