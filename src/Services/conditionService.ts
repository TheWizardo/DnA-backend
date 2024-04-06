import { Condition } from "../Models/condition-model";
import CouponModel from "../Models/coupon-model";
import OrderModel from "../Models/order-model";

class ConditionService {
    public validateCouponConditions(coupon: CouponModel, order: OrderModel): string {
        for (const cond of coupon.conditions) {
            console.log(cond.field, cond.condition, cond.value)
            console.log(order[cond.field], cond.value)
            const error = `field '${cond.field}' with value '${order[cond.field]}' does not fulfil condition '${cond.condition} ${cond.value}'`
            switch (cond.condition) {
                case Condition.is:
                    if (!(order[cond.field] === cond.value)) return error;
                    break;
                case Condition.greaterThan:
                    if (!(order[cond.field] > cond.value)) return error;
                    break;
                case Condition.greaterOrEqualTo:
                    if (!(order[cond.field] >= cond.value)) return error;
                    break;
            }
        }
        return "";
    }
}

const conditionService = new ConditionService();
export default conditionService;