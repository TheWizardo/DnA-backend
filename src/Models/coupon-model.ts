import Joi from "joi";

class CouponModel {
    public code: string;
    public percentage: number;

    public constructor(coupon: CouponModel) {
        this.code = coupon.code;
        this.percentage = coupon.percentage;
    }

    private static validationScheme = Joi.object({
        code: Joi.string().required(),
        percentage: Joi.number().required().positive().integer().max(100),
    });

    public validate(): string {
        const result = CouponModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default CouponModel;