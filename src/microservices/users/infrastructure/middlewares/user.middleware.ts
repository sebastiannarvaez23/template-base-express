import { UserValidator } from "../../application/validations/user.validator";
import { validationMiddleware } from "../../../../lib-core/middlewares/validators/validation.middleware";

const userValidator = new UserValidator();

export class UserMiddleware {
    validateAdd = validationMiddleware(userValidator);
}