import { AuthValidator } from "../../application/validations/auth.validator";
import { UserValidator } from "../../application/validations/user.validator";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";

const userValidator = new UserValidator();
const authValidator = new AuthValidator();

export class UserMiddleware {
    validateAdd = validationMiddleware(userValidator);
    validateAuth = validationMiddleware(authValidator);
}