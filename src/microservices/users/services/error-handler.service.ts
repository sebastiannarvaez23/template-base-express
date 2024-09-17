import { HttpError } from '../../../api-gateway/domain/entities/error.entity';
import { Request, Response } from 'express';
import { UniqueConstraintError, ValidationErrorItem, DatabaseError } from 'sequelize';

export class ErrorHandlerService {
    handle(err: HttpError | Error, req: Request, res: Response) {
        console.error('Error caught by ErrorHandlerService:', err);

        if (err instanceof UniqueConstraintError) {
            const errors = err.errors.reduce((acc: { [key: string]: string[] }, e: ValidationErrorItem) => {
                const field = e.path || 'unknown';
                if (!acc[field]) acc[field] = [];
                acc[field].push('Must be unique.');
                return acc;
            }, {});

            return res.status(400).json({
                data: null,
                errors
            });
        }

        if (err instanceof DatabaseError) {
            // Access the error code from err.original
            const errorCode = (err.original as any).code;

            if (errorCode === '22P02') {
                return res.status(400).json({
                    data: null,
                    errors: [{ message: 'Invalid UUID format.' }]
                });
            }

            // Handle other DatabaseErrors
            return res.status(500).json({
                data: null,
                errors: [{ message: 'Database error occurred.' }]
            });
        }

        if (err instanceof HttpError) {
            return res.status(err.statusCode).json({
                data: null,
                errors: [{ message: err.message }]
            });
        }

        return res.status(500).json({
            data: null,
            errors: [{ message: "An unexpected error occurred." }]
        });
    }
}
