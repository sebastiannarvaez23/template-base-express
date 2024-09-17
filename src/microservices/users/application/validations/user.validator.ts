import { BaseValidator, isRequired, isString, isEmail, minLength, isDate, maxLength, isNumericString } from "../../../../api-gateway/middlewares/validation.middleware";
import { UserEntity } from "../../domain/entities/user.entity";

export class UserValidator extends BaseValidator<UserEntity> {
    constructor() {
        super({

        });
    }
}