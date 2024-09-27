import { AuthEntity } from '../../domain/entities/auth.entity';
import { BaseValidator } from '../../../../lib-core/middlewares/validators/validation.middleware';
import { isRequired, isString, minLength, maxLength } from '../../../../lib-core/middlewares/validators/validation.type';

export class AuthValidator extends BaseValidator<AuthEntity> {
    constructor() {
        super({
            nickname: [isRequired, isString, minLength(5), maxLength(20)],
            password: [isRequired, isString, minLength(3), maxLength(200)]
        });
    }
}