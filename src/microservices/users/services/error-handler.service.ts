// src/microservices/users/services/error-handler.service.ts

import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError, ValidationErrorItem } from 'sequelize';

export class ErrorHandlerService {
    handle(err: any, req: Request, res: Response) {
        console.error('Error caught by ErrorHandlerService:', err);

        if (err instanceof UniqueConstraintError) {
            const errors = err.errors.reduce((acc: { [key: string]: string[] }, e: ValidationErrorItem) => {
                const field = e.path || 'unknown';
                if (!acc[field]) {
                    acc[field] = [];
                }
                acc[field].push('Must be unique.');
                return acc;
            }, {});

            return res.status(400).json({
                data: null,
                errors
            });
        }

        if (err instanceof Error) {
            return res.status(500).json({
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
