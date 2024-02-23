import dal from "../Utils/dal";
import { IdNotFound, UnauthorizedError, ValidationError } from "../Models/client-errors";
import config from "../Utils/config";
import CouponModel from "../Models/coupon-model";

async function getAllCoupons(): Promise<CouponModel[]> {
    const raw_text = await dal.readString(config.couponsEndpoint);
    return JSON.parse(raw_text) as CouponModel[];
}

async function getCouponPercentage(couponCode: string): Promise<number> {
    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => c.code !== couponCode);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponCode);
    }
    return allCoupons.filter(c => c.code === couponCode)[0].percentage;
}

async function deleteCoupon(couponCode: string): Promise<void> {
    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => c.code !== couponCode);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponCode);
    }
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCouponsBut))
    return;
}

async function updateCoupon(coupon: CouponModel): Promise<CouponModel> {
    // verifying given destination
    const error = coupon.validate();
    if (error) throw new ValidationError(error);

    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => c.code !== coupon.code);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(coupon.code);
    }
    allCouponsBut.push(coupon);
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCouponsBut))
    return coupon;
}

async function addCoupon(coupon: CouponModel): Promise<CouponModel> {
    // verifying given destination
    const error = coupon.validate();
    if (error) throw new ValidationError(error);

    const allCoupons = await getAllCoupons();
    allCoupons.push(coupon);
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCoupons))
    return coupon;
}

export default {
    getAllCoupons,
    getCouponPercentage,
    deleteCoupon,
    updateCoupon,
    addCoupon
};