import { NextFunction, Request, Response } from "express";
import { PersonValidator } from "../../application/validations/person.validator";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";

const userValidator = new PersonValidator();

export class UsersMiddleware {
    constructor() { }
    async validateAdd(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (error) {
            console.error('Validation error:', error);
            res.status(400).json({ message: 'Validation failed' });
        }
    }
    validateEdit = validationMiddleware(userValidator);
}