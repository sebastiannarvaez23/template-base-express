import { PersonValidator } from "../../application/validations/person.validator";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";

const userValidator = new PersonValidator();

export class UsersMiddleware {
    constructor() { }
    validateAdd = validationMiddleware(userValidator);
    validateEdit = validationMiddleware(userValidator);
}