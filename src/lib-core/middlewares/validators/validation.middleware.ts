import { Request, Response, NextFunction } from "express";
import { isRequired } from "./validation.type";

type ValidatorFn = (value: any) => boolean | string;

interface ValidationRules {
    [key: string]: ValidatorFn[];
}

export abstract class BaseValidator<T> {
    private readonly rules: ValidationRules;

    constructor(rules: ValidationRules) {
        this.rules = rules;
    }

    validate(data: T): { valid: boolean, errors: Record<string, string[] | string> } {
        const errors: Record<string, string[] | string> = {};
        let valid = true;

        // Check for unexpected fields
        const unexpectedFields = Object.keys(data as object).filter(field => !this.rules[field]);
        if (unexpectedFields.length > 0) {
            unexpectedFields.forEach(field => {
                errors[field] = `The parameter '${field}' was not expected`;
            });
            valid = false;
        }

        // Validate expected fields
        for (const [field, validators] of Object.entries(this.rules)) {
            const value = (data as any)[field];
            errors["internalCode"] = "000021";
            errors[field] = [];

            if (value === undefined) {
                const isRequiredValidator = validators.find(v => v === isRequired);
                if (isRequiredValidator) {
                    valid = false;
                    (errors[field] as string[]).push(isRequired(value).toString());
                }
            } else {
                validators.forEach(validator => {
                    const result = validator(value);
                    if (typeof result === 'string') {
                        valid = false;
                        (errors[field] as string[]).push(result);
                    }
                });
            }

            if (errors[field].length === 0) {
                delete errors[field];
            }
        }

        return { valid, errors };
    }
}

export const validationMiddleware = <T>(validator: BaseValidator<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { valid, errors } = validator.validate(req.body);
        if (!valid) {
            return res.status(400).json({ errors });
        }
        next();
    };
};