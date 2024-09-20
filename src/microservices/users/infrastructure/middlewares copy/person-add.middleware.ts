import { PersonValidator } from "../../application/validations/person-add.validator";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";

const userValidator = new PersonValidator();

export class PersonMiddleware {
    validateAdd = validationMiddleware(userValidator);
    validateEdit = validationMiddleware(userValidator);
}