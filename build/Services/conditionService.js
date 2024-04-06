"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var condition_model_1 = require("../Models/condition-model");
var ConditionService = /** @class */ (function () {
    function ConditionService() {
    }
    ConditionService.prototype.validateCouponConditions = function (coupon, order) {
        for (var _i = 0, _a = coupon.conditions; _i < _a.length; _i++) {
            var cond = _a[_i];
            console.log(cond.field, cond.condition, cond.value);
            console.log(order[cond.field], cond.value);
            var error = "field '".concat(cond.field, "' with value '").concat(order[cond.field], "' does not fulfil condition '").concat(cond.condition, " ").concat(cond.value, "'");
            switch (cond.condition) {
                case condition_model_1.Condition.is:
                    if (!(order[cond.field] === cond.value))
                        return error;
                    break;
                case condition_model_1.Condition.greaterThan:
                    if (!(order[cond.field] > cond.value))
                        return error;
                    break;
                case condition_model_1.Condition.greaterOrEqualTo:
                    if (!(order[cond.field] >= cond.value))
                        return error;
                    break;
            }
        }
        return "";
    };
    return ConditionService;
}());
var conditionService = new ConditionService();
exports.default = conditionService;
