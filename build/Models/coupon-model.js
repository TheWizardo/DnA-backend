"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var order_model_1 = __importDefault(require("./order-model"));
var condition_model_1 = __importDefault(require("./condition-model"));
var CouponType;
(function (CouponType) {
    CouponType["percentDiscount"] = "percentDiscount";
    CouponType["valueDiscount"] = "valueDiscount";
    CouponType["item"] = "item";
    CouponType["shipping"] = "shipping";
})(CouponType || (CouponType = {}));
//Still need to figure out how to handle item coupons
var CouponModel = /** @class */ (function () {
    function CouponModel(coupon) {
        this.id = coupon.id;
        this.code = coupon.code;
        this.type = coupon.type;
        this.discount = coupon.discount;
        this.conditions = coupon === null || coupon === void 0 ? void 0 : coupon.conditions.map(function (c) {
            if (c.validate === undefined) {
                c = new condition_model_1.default(c);
            }
            return c;
        });
    }
    CouponModel.prototype.validate = function () {
        var _a;
        var conditionsRes = this.conditions.map(function (c) { return c.validate(order_model_1.default.GetDefaultObject()); });
        var couponRes = CouponModel.validationScheme.validate(this);
        return ((_a = couponRes.error) === null || _a === void 0 ? void 0 : _a.message) || conditionsRes[0];
    };
    CouponModel.validationScheme = joi_1.default.object({
        id: joi_1.default.string().uuid(),
        code: joi_1.default.string().uppercase().required(),
        type: joi_1.default.string().required(),
        discount: joi_1.default.number().required().greater(-1).integer().max(100),
        conditions: joi_1.default.required()
    });
    return CouponModel;
}());
exports.default = CouponModel;
