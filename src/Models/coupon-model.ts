import Joi from "joi";
import OrderModel from "./order-model";
import CouponConditions from "./condition-model";

enum CouponType {
    percentDiscount = "percentDiscount",
    valueDiscount = "valueDiscount",
    item = "item",
    shipping = "shipping"
}

//Still need to figure out how to handle item coupons

class CouponModel {
    public id: string;
    public type: CouponType;
    public code: string;
    public discount: number;
    public conditions: CouponConditions<OrderModel>[];

    public constructor(coupon: CouponModel) {
        this.id = coupon.id;
        this.code = coupon.code;
        this.type = coupon.type;
        this.discount = coupon.discount;
        this.conditions = coupon?.conditions.map(c => {
            if (c.validate === undefined) {
                c = new CouponConditions<OrderModel>(c);
            }
            return c;
        });
    }

    private static validationScheme = Joi.object({
        id: Joi.string().uuid(),
        code: Joi.string().uppercase().required(),
        type: Joi.string().required(),
        discount: Joi.number().required().greater(-1).integer().max(100),
        conditions: Joi.required()
    });

    public validate(): string {
        const conditionsRes = this.conditions.map(c => c.validate(OrderModel.GetDefaultObject()));
        const couponRes = CouponModel.validationScheme.validate(this);
        return couponRes.error?.message || conditionsRes[0];
    }
}

export default CouponModel;