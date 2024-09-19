import { BaseValidator, isRequired, isString, minLength, maxLength } from '../../../../api-gateway/middlewares/validation.middleware';
import { AuthEntity } from '../../domain/entities/auth.entity';

export class AuthValidator extends BaseValidator<AuthEntity> {
    constructor() {
        super({
            nickname: [isRequired, isString, minLength(5), maxLength(20)],
            password: [isRequired, isString, minLength(3), maxLength(200)]
        });
    }
}