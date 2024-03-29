import dal from "../Utils/dal";
import { ForbiddenError, IdNotFound, UnauthorizedError, ValidationError } from "../Models/errors-models";
import config from "../Utils/config";
import CouponModel from "../Models/coupon-model";
import encryptionService from "../Services/encryptionService";
import { v4 as uuid } from 'uuid';

async function getAllCoupons(shouldStrip: boolean = false): Promise<CouponModel[]> {
    const raw_text = await dal.readString(config.couponsEndpoint);
    const coupons: CouponModel[] = JSON.parse(raw_text);
    if (shouldStrip) return stripSha(coupons);
    return coupons;
}

// %2F => /
// %2B => +
// %3D => =
async function getCoupon(couponCode: string): Promise<CouponModel> {
    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => encryptionService.sha256(couponCode) !== extractSha(c));
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponCode, "CouponLogic-getCoupon");
    }
    const selectedCoupon = allCoupons.filter(c => encryptionService.sha256(couponCode) === extractSha(c))[0];
    delete selectedCoupon.code;
    console.log(couponCode);
    console.log(selectedCoupon);
    return selectedCoupon;
}

async function deleteCoupon(couponId: string): Promise<void> {
    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => c.id !== couponId);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponId, "CouponLogic-deleteCoupon");
    }
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCouponsBut))
    return;
}

async function updateCoupon(couponId: string, coupon: CouponModel): Promise<CouponModel> {
    // verifying given coupon
    const error = coupon.validate();
    if (error) throw new ValidationError(error, "CouponLogic-updateCoupon");

    const allCoupons = await getAllCoupons();
    const allCouponsBut = allCoupons.filter(c => c.id !== couponId);
    // making sure we have that coupon
    if (allCoupons.length === allCouponsBut.length) {
        throw new IdNotFound(couponId, "CouponLogic-updateCoupon");
    }

    const filtered = allCoupons.filter(c => encryptionService.sha256(c.code) === extractSha(c));
    if (filtered.length > 0) {
        throw new ForbiddenError("Cannot have two coupons with the same name.", "CouponLogic-updateCoupon");
    }
    coupon.code = encryptionService.rsaEncrypt(coupon.code) + encryptionService.sha256(coupon.code);
    allCouponsBut.push(coupon);
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCouponsBut))
    return coupon;
}

async function addCoupon(coupon: CouponModel): Promise<CouponModel> {
    // verifying given coupon
    coupon.id = uuid();
    const error = coupon.validate();
    if (error) throw new ValidationError(error, "CouponLogic-addCoupon");

    const allCoupons = await getAllCoupons();
    const filtered = allCoupons.filter(c => encryptionService.sha256(coupon.code) === extractSha(c));
    if (filtered.length > 0) {
        throw new ForbiddenError("Cannot add two coupons with the same code. Were you trying to edit?", "CouponLogic-addCoupon");
    }
    coupon.code = encryptionService.rsaEncrypt(coupon.code) + encryptionService.sha256(coupon.code);
    allCoupons.push(coupon);
    await dal.writeFile(config.couponsEndpoint, JSON.stringify(allCoupons))
    return coupon;
}

function stripSha(coupons: CouponModel[]): CouponModel[] {
    return coupons.map(c => { c.code = c.code.slice(0, c.code.length - 64); return c; })
}

function extractSha(coupon: CouponModel): string {
    return coupon.code.slice(coupon.code.length - 64);
}

export default {
    getAllCoupons,
    getCoupon,
    deleteCoupon,
    updateCoupon,
    addCoupon
};