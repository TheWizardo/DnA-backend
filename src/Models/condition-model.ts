import Joi from "joi";

export enum Condition {
    is = "is",
    greaterThan = "gt",
    greaterOrEqualTo = "gte",
}

export default class CouponConditions<T> {
    public field: keyof T;
    public condition: Condition;
    public value: T[keyof T];

    public constructor(condition: CouponConditions<T>) {
        this.field = condition.field;
        this.condition = condition.condition;
        this.value = condition.value;
    }

    private static validationScheme(fields: string[]) {
        return Joi.object({
            field: Joi.string().valid(...fields),
            condition: Joi.string().required(),
            value: Joi.required()
        });
    }

    public validate(obj: T): string {
        const result = CouponConditions.validationScheme(Object.keys(obj)).validate(this);
        return result.error?.message;
    }
}