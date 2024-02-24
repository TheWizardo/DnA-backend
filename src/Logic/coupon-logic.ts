import dal from "../Utils/dal";
import { ForbiddenError, IdNotFound, UnauthorizedError, ValidationError } from "../Models/errors-models";
import config from "../Utils/config";
import CouponModel from "../Models/coupon-model";
import encrypt from "../Utils/encrypt";

async function getAllCoupons(privateKey?: string): Promise<CouponModel[]> {
    const raw_text = await dal.readString(config.couponsEndpoint);
    const coupons: CouponModel[] = JSON.parse(raw_text);
    if (privateKey) {
        coupons.map(c => c.code = encrypt.rsaDecrypt(c.code, privateKey))
    }
    return coupons;
}

// %2F => /
// %2B => +
// %3D => =
async function getCouponPercentage(couponCode: string): Promise<number> {
    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => c.code !== couponCode);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponCode);
    }
    return allCoupons.filter(c => c.code === couponCode)[0].percentage;
}

async function deleteCoupon(couponCode: string, privateKey: string): Promise<void> {
    if (!privateKey) throw new ValidationError("privateKey not provided");
    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => encrypt.rsaDecrypt(c.code, privateKey) !== couponCode);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponCode);
    }
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCouponsBut))
    return;
}

async function updateCoupon(couponCode: string, coupon: CouponModel, privateKey: string): Promise<CouponModel> {
    if (!privateKey) throw new ValidationError("privateKey not provided");
    // verifying given coupon
    const error = coupon.validate();
    if (error) throw new ValidationError(error);

    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => encrypt.rsaDecrypt(c.code, privateKey) !== couponCode);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponCode);
    }
    console.log(couponCode, "=>", coupon.code);
    const filtered = allCoupons.filter(c => encrypt.rsaDecrypt(c.code, privateKey) === coupon.code);
    if (filtered.length > 0) {
        throw new ForbiddenError("Cannot have two coupons with the same name.");
    }
    coupon.code = encrypt.rsaEncrypt(coupon.code);
    allCouponsBut.push(coupon);
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCouponsBut))
    return coupon;
}

async function addCoupon(coupon: CouponModel, privateKey: string): Promise<CouponModel> {
    if (!privateKey) throw new ValidationError("privateKey not provided");
    // verifying given coupon
    const error = coupon.validate();
    if (error) throw new ValidationError(error);

    const allCoupons = await getAllCoupons();
    console.log(coupon.code);
    const filtered = allCoupons.filter(c => encrypt.rsaDecrypt(c.code, privateKey) === coupon.code);
    if (filtered.length > 0) {
        throw new ForbiddenError("Cannot add two coupons with the same code. Were you trying to edit?");
    }
    coupon.code = encrypt.rsaEncrypt(coupon.code);
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