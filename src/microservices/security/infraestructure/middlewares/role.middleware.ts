import { RoleAddServiceAssignmentValidator } from "../../application/validations/rol-service-assignment.validator";
import { RoleAddValidator } from "../../application/validations/role-add.validator";
import { RoleEditValidator } from "../../application/validations/role-edit.validator";
import { validationMiddleware } from "../../../../lib-core/middlewares/validators/validation.middleware";

const roleAddValidator = new RoleAddValidator();
const roleEditValidator = new RoleEditValidator();
const roleAddServiceAssignmentValidator = new RoleAddServiceAssignmentValidator();

export class RoleMiddleware {
    validateAdd = validationMiddleware(roleAddValidator);
    validateEdit = validationMiddleware(roleEditValidator);
    validateRolAddServiceAssignment = validationMiddleware(roleAddServiceAssignmentValidator);
}