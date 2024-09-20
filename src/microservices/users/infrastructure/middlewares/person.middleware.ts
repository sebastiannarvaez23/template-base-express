import { PersonAddValidator } from "../../application/validations/person-add.validator";
import { PersonEditValidator } from "../../application/validations/person-edit.validator";
import { validationMiddleware } from "../../../../api-gateway/middlewares/validation.middleware";

const personAddValidator = new PersonAddValidator();
const personEditValidator = new PersonEditValidator();

export class PersonMiddleware {
    validateAdd = validationMiddleware(personAddValidator);
    validateEdit = validationMiddleware(personEditValidator);
}