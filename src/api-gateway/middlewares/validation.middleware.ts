import { Request, Response, NextFunction } from 'express';

type ValidatorFn = (value: any) => boolean | string;

interface ValidationRules {
    [key: string]: ValidatorFn[];
}

export abstract class BaseValidator<T> {
    private readonly rules: ValidationRules;

    constructor(rules: ValidationRules) {
        this.rules = rules;
    }

    validate(data: T): { valid: boolean, errors: Record<string, string[]> } {
        const errors: Record<string, string[]> = {};
        let valid = true;

        for (const [field, validators] of Object.entries(this.rules)) {
            const value = (data as any)[field];
            errors[field] = [];

            validators.forEach(validator => {
                const result = validator(value);
                if (typeof result === 'string') {
                    valid = false;
                    errors[field].push(result);
                }
            });

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

export const isRequired = (value: any): boolean | string =>
    value !== null && value !== undefined ? true : 'This field is required.';

export const isString = (value: any): boolean | string =>
    typeof value === 'string' ? true : 'Must be a string.';

export const isNumber = (value: any): boolean | string =>
    typeof value === 'number' ? true : 'Must be a number.';

export const minLength = (min: number) => (value: any): boolean | string =>
    typeof value === 'string' && value.length >= min ? true : `Must be at least ${min} characters long.`;

export const maxLength = (max: number) => (value: any): boolean | string =>
    typeof value === 'string' && value.length <= max ? true : `Must be no more than ${max} characters long.`;

export const isEmail = (value: any): string | boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value === 'string' && emailRegex.test(value)) {
        return true;
    }
    return 'Must be a valid email address.';
};

export const isDate = (value: any): string | boolean => {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
        return true;
    }
    return 'Must be a valid date.';
};

export const isNumericString = (value: any): string | boolean => {
    const numericRegex = /^[0-9]+$/;
    if (typeof value === 'string' && numericRegex.test(value)) {
        return true;
    }
    return 'Must contain only numeric characters.';
};

export const isUnique = async (value: any, checkUniqueFn: (value: any) => Promise<boolean>): Promise<boolean | string> => {
    const isUniqueValue = await checkUniqueFn(value);
    return isUniqueValue ? true : 'Must be unique.';
};

export const isUUID = (value: any): boolean | string => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (typeof value === 'string' && uuidRegex.test(value)) {
        return true;
    }
    return 'Must be a valid UUID.';
};
