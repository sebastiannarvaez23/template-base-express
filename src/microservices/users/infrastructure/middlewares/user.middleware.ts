import { UserValidator } from "../../application/validations/user.validator";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";

const userValidator = new UserValidator();

export class UserMiddleware {
    validateAdd = validationMiddleware(userValidator);
}