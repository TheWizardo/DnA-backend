"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var product_types_1 = require("./product-types");
var OrderModel = /** @class */ (function () {
    function OrderModel(order) {
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
    OrderModel.prototype.validate = function () {
        var _a;
        var result = OrderModel.validationScheme.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    OrderModel.GetDefaultObject = function () {
        return OrderModel.obj;
    };
    OrderModel.obj = {
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
    };
    OrderModel.validationScheme = joi_1.default.object({
        order_number: joi_1.default.string().optional().length(8),
        type: (_a = joi_1.default.string().required()).valid.apply(_a, Object.values(product_types_1.ProductType)),
        time: joi_1.default.number().required().positive(),
        first_name: joi_1.default.string().required().min(2).max(50),
        last_name: joi_1.default.string().required().min(2).max(50),
        amount: joi_1.default.number().positive().integer().required(),
        phone: joi_1.default.string().required().length(10),
        street: joi_1.default.alternatives().conditional("type", { is: product_types_1.ProductType.printedBook, then: joi_1.default.string().required(), otherwise: joi_1.default.string().optional() }),
        street_num: joi_1.default.alternatives().conditional("type", { is: product_types_1.ProductType.printedBook, then: joi_1.default.number().positive().integer().required(), otherwise: joi_1.default.number().optional() }),
        city: joi_1.default.alternatives().conditional("type", { is: product_types_1.ProductType.printedBook, then: joi_1.default.string().required(), otherwise: joi_1.default.string().optional() }),
        zip: joi_1.default.alternatives().conditional("type", { is: product_types_1.ProductType.printedBook, then: joi_1.default.string().length(7).required(), otherwise: joi_1.default.string().optional() }),
        email: joi_1.default.string().email().required(),
        comments: joi_1.default.string().optional().allow(null, ''),
        price: joi_1.default.number().positive(),
        dedication_name: joi_1.default.alternatives().conditional("type", { is: product_types_1.ProductType.printedBook, then: joi_1.default.string().required().min(2).max(50), otherwise: joi_1.default.string().optional() }),
        tracking_number: joi_1.default.string().optional(),
        coupon_code: joi_1.default.string().optional()
    });
    return OrderModel;
}());
exports.default = OrderModel;
