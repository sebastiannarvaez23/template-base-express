import { validationMiddleware } from "../../../../lib-core/middlewares/validators/validation.middleware";
import { RoleAddValidator } from "../../application/validations/role-add.validator";
import { RoleEditValidator } from "../../application/validations/role-edit.validator";

const roleAddValidator = new RoleAddValidator();
const roleEditValidator = new RoleEditValidator();

export class RoleMiddleware {
    validateAdd = validationMiddleware(roleAddValidator);
    validateEdit = validationMiddleware(roleEditValidator);
}