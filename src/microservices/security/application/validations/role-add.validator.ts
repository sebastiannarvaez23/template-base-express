import { BaseValidator } from "../../../../api-gateway/middlewares/validators/validation.middleware";
import { isRequired, isString, isEmail, minLength, isDate, maxLength, isNumericString, isUUID } from "../../../../api-gateway/middlewares/validators/validation.type";
import { RoleEntity } from "../../domain/entities/role.entity";

export class RoleAddValidator extends BaseValidator<RoleEntity> {
    constructor() {
        super({

        });
    }
}