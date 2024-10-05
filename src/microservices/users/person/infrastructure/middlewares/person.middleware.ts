import { Request, Response, NextFunction } from "express";

import { PersonAddValidator } from "../../application/validations/person-add.validator";
import { PersonEditValidator } from "../../application/validations/person-edit.validator";
import { validationMiddleware } from "../../../../../lib-core/middlewares/validators/validation.middleware";

const personAddValidator = new PersonAddValidator();
const personEditValidator = new PersonEditValidator();

export class PersonMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(personAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(personEditValidator)(req, res, next);
    }
}