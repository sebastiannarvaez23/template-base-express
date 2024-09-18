import { BaseValidator, isRequired, isString, minLength, isDate, maxLength, isBoolean, isNullable } from '../../../../api-gateway/middlewares/validation.middleware';
import { UserEntity } from "../../domain/entities/user.entity";

export class UserValidator extends BaseValidator<UserEntity> {
    constructor() {
        super({
            nickname: [isRequired, isString, minLength(5), maxLength(20)],
            password: [isRequired, isString, minLength(3), maxLength(200)],
            lastAuth: [isNullable, isDate],
            origin: [isNullable, isString, minLength(3), maxLength(100)],
            active: [isNullable, isBoolean]
        });
    }
}