import { UserValidator } from "../../application/validations/user.validator";
import { validationMiddleware } from "../../../../lib-core/middlewares/validators/validation.middleware";
import { NextFunction, Request, Response } from "express";

const userValidator = new UserValidator();

export class UserMiddleware {
    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(userValidator)(req, res, next);
    }
}