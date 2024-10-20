import { AuthEntity } from "../../../lib-entities/auth/auth.entity";
import { BaseValidator } from "./validation.middleware";
import { isRequired, isString, minLength, maxLength } from "./validation.type";

export class AuthValidator extends BaseValidator<AuthEntity> {
    constructor() {
        super({
            nickname: [isRequired, isString, minLength(5), maxLength(20)],
            password: [isRequired, isString, minLength(3), maxLength(200)]
        });
    }
}