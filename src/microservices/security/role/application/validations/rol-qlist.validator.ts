import { BaseValidator } from "../../../../../lib-core/middlewares/validators/validation.middleware";
import { isNumericString, isString, maxLength, minLength } from "../../../../../lib-core/middlewares/validators/validation.type";
import { RolListParams } from "../../domain/entities/rol-qlist.entity";

export class RolListValidator extends BaseValidator<RolListParams> {
    constructor() {
        super({
            page: [isNumericString],
            name: [isString, minLength(3), maxLength(70)],
            limit: [isNumericString],
        });
    }
}