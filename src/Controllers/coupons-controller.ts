import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import couponsLogic from '../Logic/coupon-logic';
import CouponModel from '../Models/coupon-model';

const router = express.Router();

router.get("/coupons", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCouponS = await couponsLogic.getAllCoupons(req.body.privateKey);
        res.json(allCouponS);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/coupons/:code", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await couponsLogic.getCouponPercentage(req.params.code);
        res.json(order);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/coupons", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.percentage = +req.body.percentage;

        const coupon = new CouponModel(req.body);
        const addedCoupon = await couponsLogic.addCoupon(coupon, req.body.privateKey);
        res.status(201).json(addedCoupon);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/coupons/:code", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await couponsLogic.deleteCoupon(req.params.code, req.body.privateKey);
        res.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/coupons/:code", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.percentage = +req.body.percentage;

        const coupon = new CouponModel(req.body);
        const updatedCoupon = await couponsLogic.updateCoupon(req.params.code, coupon, req.body.privateKey);
        res.json(updatedCoupon);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;