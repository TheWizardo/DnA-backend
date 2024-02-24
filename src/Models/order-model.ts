import Joi from "joi";

class OrderModel {
    public id: string;
    public type: string;

    public first_name: string;
    public last_name: string;

    public amount: number;

    public phone: string;

    public street: string;
    public street_num: number;
    public apartment: number;
    public city: string;
    public zip: string;

    public reply_to: string;

    public comments: string;

    public price: number;

    public dedicate: boolean;
    public for_self: boolean;
    public dedication_name: string;

    public tracking_number: string;


    public constructor(order: OrderModel) {
        this.id = order.id;
        this.type = order.type;
        this.first_name = order.first_name;
        this.last_name = order.last_name;
        this.amount = order.amount;
        this.phone = order.phone;
        this.street = order.street;
        this.street_num = order.street_num;
        this.apartment = order.apartment;
        this.city = order.city;
        this.zip = order.zip;
        this.reply_to = order.reply_to;
        this.comments = order.comments;
        this.price = order.price;
        this.dedicate = order.dedicate;
        this.for_self = order.for_self;
        this.dedication_name = order.dedication_name;
        this.tracking_number = order.tracking_number;
    }

    private static validationScheme = Joi.object({
        id: Joi.string().required(),
        type: Joi.string().required(),
        first_name: Joi.string().required().min(2).max(50),
        last_name: Joi.string().required().min(2).max(50),
        amount: Joi.number().positive().integer().required(),
        phone: Joi.string().required().length(10),
        street: Joi.alternatives().conditional("type", { is: "PrintedBook", then: Joi.string().required(), otherwise: Joi.string().optional() }),
        street_num: Joi.alternatives().conditional("type", { is: "PrintedBook", then: Joi.number().positive().integer().required(), otherwise: Joi.number().optional() }),
        apartment: Joi.alternatives().conditional("type", { is: "PrintedBook", then: Joi.number().positive().integer().required(), otherwise: Joi.number().optional() }),
        city: Joi.alternatives().conditional("type", { is: "PrintedBook", then: Joi.string().required(), otherwise: Joi.string().optional() }),
        zip: Joi.alternatives().conditional("type", { is: "PrintedBook", then: Joi.string().length(7).required(), otherwise: Joi.string().optional() }),
        reply_to: Joi.string().email().required(),
        comments: Joi.string().optional().allow(null, ''),
        price: Joi.number().positive(),
        dedicate: Joi.alternatives().conditional("type", { is: "PrintedBook", then: Joi.boolean().required(), otherwise: Joi.boolean().optional() }),
        for_self: Joi.alternatives().conditional("dedicate", { is: true, then: Joi.boolean().required(), otherwise: Joi.boolean().optional() }),
        dedication_name: Joi.alternatives().conditional("dedicate", { is: true, then: Joi.alternatives().conditional("for_self", { is: true, then: Joi.string().required(), otherwise: Joi.string().optional() }), otherwise: Joi.string().optional() }),
        tracking_number: Joi.string().optional()
    });


    public validate(): string {
        const result = OrderModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default OrderModel;