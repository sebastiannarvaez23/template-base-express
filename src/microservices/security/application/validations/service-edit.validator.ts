import { BaseValidator } from "../../../../api-gateway/middlewares/validators/validation.middleware";
import { isRequired, isString, isEmail, minLength, isDate, maxLength, isNumericString, isUUID } from "../../../../api-gateway/middlewares/validators/validation.type";
import { ServiceEntity } from "../../domain/entities/service.entity";

export class ServiceEditValidator extends BaseValidator<ServiceEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)],
            code: [isRequired, isNumericString, maxLength(6)]
        });
    }
}