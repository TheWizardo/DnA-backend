import express, { Request, Response, NextFunction } from 'express';
import verify from '../Middleware/verify-user';
import couponsLogic from '../Logic/coupon-logic';
import CouponModel from '../Models/coupon-model';

const router = express.Router();

router.get("/coupons", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCouponS = await couponsLogic.getAllCoupons(couponsLogic.decodePrivateKey(req.query.privateKey as string));
        res.json(allCouponS);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-GetAll"});
    }
});

router.get("/coupons/:code", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await couponsLogic.getCoupon(req.params.code);
        res.json(order);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-GetFromCode"});
    }
});

router.post("/coupons", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.discount = +req.body.discount;

        const coupon = new CouponModel(req.body);
        const addedCoupon = await couponsLogic.addCoupon(coupon, couponsLogic.decodePrivateKey(req.query.privateKey as string));
        res.status(201).json(addedCoupon);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-NewCoupon"});
    }
});

router.delete("/coupons/:id", verify.verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await couponsLogic.deleteCoupon(req.params.id, couponsLogic.decodePrivateKey(req.query.privateKey as string));
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
        const updatedCoupon = await couponsLogic.updateCoupon(req.params.id, coupon, couponsLogic.decodePrivateKey(req.query.privateKey as string));
        res.json(updatedCoupon);
    }
    catch (err: any) {
        next({error: err, from: "CouponsController-AugmentCoupon"});
    }
});

export default router;