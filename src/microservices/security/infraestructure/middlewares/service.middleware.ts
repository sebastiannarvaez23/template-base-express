import { validationMiddleware } from "../../../../api-gateway/middlewares/validators/validation.middleware";
import { ServiceAddValidator } from "../../application/validations/service-add.validator";
import { ServiceEditValidator } from "../../application/validations/service-edit.validator";

const serviceAddValidator = new ServiceAddValidator();
const serviceEditValidator = new ServiceEditValidator();

export class ServiceMiddleware {
    validateAdd = validationMiddleware(serviceAddValidator);
    validateEdit = validationMiddleware(serviceEditValidator);
}