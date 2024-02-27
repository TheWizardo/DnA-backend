"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CouponModel = /** @class */ (function () {
    function CouponModel(coupon) {
        this.code = coupon.code;
        this.percentage = coupon.percentage;
    }
    CouponModel.prototype.validate = function () {
        var _a;
        var result = CouponModel.validationScheme.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CouponModel.validationScheme = joi_1.default.object({
        code: joi_1.default.string().required(),
        percentage: joi_1.default.number().required().positive().integer().max(100),
    });
    return CouponModel;
}());
exports.default = CouponModel;
