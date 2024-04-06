"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
var joi_1 = __importDefault(require("joi"));
var Condition;
(function (Condition) {
    Condition["is"] = "is";
    Condition["greaterThan"] = "gt";
    Condition["greaterOrEqualTo"] = "gte";
})(Condition || (exports.Condition = Condition = {}));
var CouponConditions = /** @class */ (function () {
    function CouponConditions(condition) {
        this.field = condition.field;
        this.condition = condition.condition;
        this.value = condition.value;
    }
    CouponConditions.validationScheme = function (fields) {
        var _a;
        return joi_1.default.object({
            field: (_a = joi_1.default.string()).valid.apply(_a, fields),
            condition: joi_1.default.string().required(),
            value: joi_1.default.required()
        });
    };
    CouponConditions.prototype.validate = function (obj) {
        var _a;
        var result = CouponConditions.validationScheme(Object.keys(obj)).validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    return CouponConditions;
}());
exports.default = CouponConditions;
