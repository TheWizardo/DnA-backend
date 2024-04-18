import Joi from "joi";
import { ProductType } from "./product-types";

class OrderModel {
    public order_number: string;
    public type: ProductType;
    public time: number;

    public first_name: string;
    public last_name: string;

    public amount: number;

    public phone: string;

    public street: string;
    public street_num: number;
    public city: string;
    public zip: string;

    public email: string;

    public comments: string;

    public price: number;

    public dedication_name: string;

    public tracking_number: string;

    public coupon_code: string;

    private static obj: OrderModel = {
        order_number: null,
        type: null,
        time: null,
        first_name: null,
        last_name: null,
        amount: null,
        phone: null,
        street: null,
        street_num: null,
        city: null,
        zip: null,
        email: null,
        comments: null,
        price: null,
        dedication_name: null,
        tracking_number: null,
        coupon_code: null,
        validate: undefined
    }

    public constructor(order: OrderModel) {
        this.order_number = order.order_number;
        this.type = order.type;
        this.time = order.time;
        this.first_name = order.first_name;
        this.last_name = order.last_name;
        this.amount = order.amount;
        this.phone = order.phone;
        this.street = order.street;
        this.street_num = order.street_num;
        this.city = order.city;
        this.zip = order.zip;
        this.email = order.email;
        this.comments = order.comments;
        this.price = order.price;
        this.dedication_name = order.dedication_name;
        this.tracking_number = order.tracking_number;
        this.coupon_code = order.coupon_code;
    }

    private static validationScheme = Joi.object({
        order_number: Joi.string().optional().length(8),
        type: Joi.string().required().valid(...Object.values(ProductType)),
        time: Joi.number().required().positive(),
        first_name: Joi.string().required().min(2).max(50),
        last_name: Joi.string().required().min(2).max(50),
        amount: Joi.number().positive().integer().required(),
        phone: Joi.string().required().length(10),
        street: Joi.alternatives().conditional("type", { is: ProductType.printedBook, then: Joi.string().required(), otherwise: Joi.string().optional() }),
        street_num: Joi.alternatives().conditional("type", { is: ProductType.printedBook, then: Joi.number().positive().integer().required(), otherwise: Joi.number().optional() }),
        city: Joi.alternatives().conditional("type", { is: ProductType.printedBook, then: Joi.string().required(), otherwise: Joi.string().optional() }),
        zip: Joi.alternatives().conditional("type", { is: ProductType.printedBook, then: Joi.string().length(7).required(), otherwise: Joi.string().optional() }),
        email: Joi.string().email().required(),
        comments: Joi.string().optional().allow(null, ''),
        price: Joi.number().positive(),
        dedication_name: Joi.alternatives().conditional("type", { is: ProductType.printedBook, then: Joi.string().required().min(2).max(50), otherwise: Joi.string().optional() }),
        tracking_number: Joi.string().optional(),
        coupon_code: Joi.string().optional()
    });

    public validate(): string {
        const result = OrderModel.validationScheme.validate(this);
        return result.error?.message;
    }

    public static GetDefaultObject() {
        return OrderModel.obj;
    }
}

export default OrderModel;