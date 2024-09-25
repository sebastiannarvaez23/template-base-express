import { BaseValidator } from "../../../../api-gateway/middlewares/validators/validation.middleware";
import { isRequired, isString, isEmail, minLength, isDate, maxLength, isNumericString, isUUID } from "../../../../api-gateway/middlewares/validators/validation.type";
import { ServiceEntity } from "../../domain/entities/service.entity";

export class ServiceAddValidator extends BaseValidator<ServiceEntity> {
    constructor() {
        super({

        });
    }
}