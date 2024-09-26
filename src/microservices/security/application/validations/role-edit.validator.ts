import { BaseValidator } from "../../../../api-gateway/middlewares/validators/validation.middleware";
import { isRequired, isString, maxLength } from "../../../../api-gateway/middlewares/validators/validation.type";
import { RoleEntity } from "../../domain/entities/role.entity";

export class RoleEditValidator extends BaseValidator<RoleEntity> {
    constructor() {
        super({
            name: [isRequired, isString, maxLength(70)]
        });
    }
}