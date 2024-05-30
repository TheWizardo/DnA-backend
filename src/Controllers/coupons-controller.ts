import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import couponsLogic from '../Logic/coupon-logic';
import CouponModel from '../Models/coupon-model';

const router = express.Router();

router.get("/coupons", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCouponS = await couponsLogic.getAllCoupons(true);
        res.json(allCouponS);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-GetAll"});
    }
});

router.post("/coupons/:code", async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.price = +req.body.price;
        req.body.amount = +req.body.amount;
        req.body.street_num = req.body?.street_num ? +req.body?.street_num : undefined;
        req.body.dedicate = req.body?.dedicate || req.body?.dedicate === "true" ? true : false;
        req.body.for_self = req.body?.for_self || req.body?.for_self === "true" ? true : false;
        
        const coupon = await couponsLogic.getCoupon(req.params.code, req.body);
        res.json(coupon);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-GetFromCode"});
    }
});

router.post("/coupons", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.discount = +req.body.discount;

        const coupon = new CouponModel(req.body);
        const addedCoupon = await couponsLogic.addCoupon(coupon);
        res.status(201).json(addedCoupon);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-NewCoupon"});
    }
});

router.delete("/coupons/:id", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await couponsLogic.deleteCoupon(req.params.id);
        res.sendStatus(204);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-DeleteCoupon"});
    }
});

router.put("/coupons/:id", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.discount = +req.body.discount;

        const coupon = new CouponModel(req.body);
        const updatedCoupon = await couponsLogic.updateCoupon(req.params.id, coupon);
        res.json(updatedCoupon);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-AugmentCoupon"});
    }
});

export default router;