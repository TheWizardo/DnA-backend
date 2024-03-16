import Joi from "joi";

enum CouponType {
    percentDiscount = "percentDiscount",
    valueDiscount = "valueDiscount",
    item = "item"
}

//Still need to figure out how to handle item coupons

class CouponModel {
    public id: string;
    public type: CouponType;
    public code: string;
    public discount: number;

    public constructor(coupon: CouponModel) {
        this.id = coupon.id;
        this.code = coupon.code;
        this.type = coupon.type;
        this.discount = coupon.discount;
    }

    private static validationScheme = Joi.object({
        id: Joi.string().uuid(),
        code: Joi.string().required(),
        type: Joi.string().required(),
        discount: Joi.number().required().positive().integer().max(100),
    });

    public validate(): string {
        const result = CouponModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default CouponModel;