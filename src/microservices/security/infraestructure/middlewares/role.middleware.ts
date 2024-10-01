import { Request, Response, NextFunction } from "express";

import { RoleAddOrDeleteServiceAssignmentValidator } from "../../application/validations/rol-service-assignment.validator";
import { RoleAddValidator } from "../../application/validations/role-add.validator";
import { RoleEditValidator } from "../../application/validations/role-edit.validator";
import { validationMiddleware } from "../../../../lib-core/middlewares/validators/validation.middleware";

const roleAddValidator = new RoleAddValidator();
const roleEditValidator = new RoleEditValidator();
const roleAddSorDeleteServiceAssignmentValidator = new RoleAddOrDeleteServiceAssignmentValidator();

export class RoleMiddleware {

    validateAdd(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(roleAddValidator)(req, res, next);
    }

    validateEdit(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(roleEditValidator)(req, res, next);
    }

    validateRolAddorDeleteServiceAssignment(req: Request, res: Response, next: NextFunction): void {
        validationMiddleware(roleAddSorDeleteServiceAssignmentValidator)(req, res, next);
    }
}